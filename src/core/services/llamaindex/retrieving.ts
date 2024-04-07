import { rag } from '@/core/interface';
import { AppRetrieveService, type AppRetrieveServiceOptions, type RetrieveCallbacks, type RetrievedChunk, type RetrievedChunkReference, type RetrieveOptions } from '@/core/services/retrieving';
import { getDb } from '@/core/v1/db';
import type { Index } from '@/core/v1/index_';
import type { Retrieve, RetrieveResult } from '@/core/v1/retrieve';
import { getOptionalEnv } from '@/lib/env';
import { cosineDistance, uuidToBin } from '@/lib/kysely';
import { type BaseRetriever, CohereRerank, NodeRelationship, type NodeWithScore, ObjectType, type RetrieveParams, type ServiceContext, TextNode } from 'llamaindex';
import type { RelatedNodeInfo, RelatedNodeType } from 'llamaindex/Node';
import type { UUID } from 'node:crypto';
import Vector = rag.Vector;

export class LlamaindexRetrieveService extends AppRetrieveService {
  protected async run (retrieve: Retrieve, {
    text, top_k = 10, search_top_k = 100, filters = {}, use_cache,
  }: RetrieveOptions): Promise<RetrievedChunk[]> {
    if (this.index.config.provider !== 'llamaindex') {
      throw new Error(`${this.index.name} is not a llamaindex index`);
    }

    const queryEmbedding = await this.embedQuery(text);

    await this.startSearch(retrieve);

    let chunks = await this.search(queryEmbedding, search_top_k);

    // Could support more filters here
    if (filters.namespaces && filters.namespaces.length > 0) {
      const set = new Set(filters.namespaces);
      chunks = chunks.filter(chunk => set.has(chunk.metadata.namespace_id));
    }

    if (!this.rerankerOptions) {
      return chunks.slice(0, top_k);
    }

    await this.startRerank(retrieve);

    return this.rerank(chunks, text, top_k, this.rerankerOptions);
  }

  asRetriever (options: Omit<RetrieveOptions, 'text'>, serviceContext: ServiceContext, callbacks: RetrieveCallbacks): BaseRetriever {
    const retrieveService = this;

    return new class implements BaseRetriever {
      async retrieve (params: RetrieveParams): Promise<NodeWithScore[]> {
        const chunks = await retrieveService.retrieve({ ...options, text: params.query }, callbacks);

        const detaildChunks = await retrieveService.extendResultDetails(chunks);

        return detaildChunks.map(chunk => {
          return {
            node: new TextNode({
              id_: chunk.document_chunk_node_id,
              text: chunk.text,
              metadata: chunk.metadata,
              relationships: Object.fromEntries(Object.entries(chunk.relationships).map(([k, v]) => {
                return [k, { nodeId: v.chunk_node_id, metadata: v.metadata } satisfies RelatedNodeInfo];
              })),
            }),
            score: chunk.relevance_score,
          };
        });
      }

      getServiceContext () {
        return serviceContext;
      }
    };
  }

  private async search (queryEmbedding: number[], top_k: number) {
    const rawChunks = await getDb()
      .selectFrom(`llamaindex_document_chunk_node_${this.index.name}`)
      .innerJoin('llamaindex_document_node as document_node', `llamaindex_document_chunk_node_${this.index.name}.document_id`, 'document_node.document_id')
      .select([
        eb => eb.fn('bin_to_uuid', [`llamaindex_document_chunk_node_${this.index.name}.id`]).as('document_chunk_node_id'),
        eb => eb.fn('bin_to_uuid', ['document_node.id']).as('document_node_id'),
        'document_node.document_id',
        `llamaindex_document_chunk_node_${this.index.name}.text as chunk_text`,
        eb => eb.ref(`llamaindex_document_chunk_node_${this.index.name}.metadata`).$castTo<any>().as('chunk_metadata'),
        eb => cosineDistance(eb, 'embedding', queryEmbedding).as('relevance_score'),
      ])
      .orderBy('relevance_score', 'desc')
      .limit(top_k)
      .execute();

    return await this.parse(this.index, rawChunks);
  }

  private async rerank (chunks: RetrievedChunk[], text: string, top_k: number, rerankerOptions: NonNullable<AppRetrieveServiceOptions['reranker']>) {
    // TODO: support custom rag rerankers like: `getReranker(flow, raranker.provider, reranker.options)`
    if (rerankerOptions.provider !== 'cohere') {
      throw new Error(`reranker ${rerankerOptions.provider} not supported`);
    }

    const reranker = new CohereRerank({
      apiKey: getOptionalEnv('COHERE_TOKEN'),
      ...rerankerOptions.options,
      topN: top_k,
    });

    const chunksMap = new Map(chunks.map(chunk => [chunk.document_chunk_node_id, chunk]));
    const nodesWithScore = await reranker.postprocessNodes(chunks.map(chunk => ({ score: chunk.relevance_score, node: transform(chunk) })), text);

    return nodesWithScore.map((nodeWithScore, index, total) => ({
      ...chunksMap.get(nodeWithScore.node.id_ as UUID)!,
      relevance_score: nodeWithScore.score ?? (total.length - index + top_k * 10),
    }));
  }

  private async parse (index: Index, results: Pick<RetrieveResult, 'relevance_score' | 'document_node_id' | 'document_chunk_node_id' | 'document_id' | 'chunk_text' | 'chunk_metadata'>[]): Promise<RetrievedChunk[]> {
    if (results.length === 0) {
      return [];
    }
    const relationships = await getDb()
      .selectFrom('llamaindex_node_relationship as rel')
      .innerJoin(`llamaindex_document_chunk_node_${index.name} as target_chunk_node`, 'rel.target_node_id', `target_chunk_node.id`)
      .select([
        eb => eb.fn('bin_to_uuid', ['rel.source_node_id']).as('source_node_id'),
        eb => eb.fn('bin_to_uuid', ['rel.target_node_id']).as('target_node_id'),
        'rel.type',
        'target_chunk_node.metadata',
      ])
      .where('rel.source_node_id', 'in', results.map(result => uuidToBin(result.document_chunk_node_id)))
      .execute();

    const nodeRelsMap = new Map<UUID, Record<string, RetrievedChunkReference>>;

    for (let relationship of relationships) {
      let rels = nodeRelsMap.get(relationship.source_node_id);
      if (!rels) {
        nodeRelsMap.set(relationship.source_node_id, rels = {});
      }
      rels[relationship.type] = {
        index_id: index.id,
        metadata: relationship.metadata,
        chunk_node_id: relationship.target_node_id,
      };
    }

    return results.map(result => ({
      index_id: index.id,
      metadata: result.chunk_metadata,
      text: result.chunk_text,
      document_node_id: result.document_node_id,
      document_chunk_node_id: result.document_chunk_node_id,
      document_id: result.document_id,
      relevance_score: result.relevance_score,
      relationships: nodeRelsMap.get(result.document_chunk_node_id) ?? {},
    }));
  }
}

export class LlamaindexRetrieverWrapper implements BaseRetriever {
  constructor (
    private readonly retrieveService: AppRetrieveService,
    private readonly options: Omit<RetrieveOptions, 'text'>,
    public readonly serviceContext: ServiceContext,
    private readonly callbacks: RetrieveCallbacks,
  ) {}

  async retrieve (params: RetrieveParams): Promise<NodeWithScore[]> {
    const chunks = await this.retrieveService.retrieve({ ...this.options, text: params.query }, this.callbacks);

    const detaildChunks = await this.retrieveService.extendResultDetails(chunks);

    return detaildChunks.map(chunk => {
      return {
        node: new TextNode({
          id_: chunk.document_chunk_node_id,
          text: chunk.text,
          metadata: chunk.metadata,
          relationships: Object.fromEntries(Object.entries(chunk.relationships).map(([k, v]) => {
            return [k, { nodeId: v.chunk_node_id, metadata: v.metadata } satisfies RelatedNodeInfo];
          })),
        }),
        score: chunk.relevance_score,
      };
    });
  }
}

function transform (result: RetrievedChunk): TextNode {
  result.relationships;
  return new TextNode({
    id_: result.document_chunk_node_id,
    text: result.text,
    metadata: result.metadata,
    excludedLlmMetadataKeys: ['namespace_id'],
    relationships: {
      [NodeRelationship.NEXT]: result.relationships[NodeRelationship.NEXT] ? transformRef(result.relationships[NodeRelationship.NEXT]) : undefined,
      [NodeRelationship.PREVIOUS]: result.relationships[NodeRelationship.PREVIOUS] ? transformRef(result.relationships[NodeRelationship.PREVIOUS]) : undefined,
      [NodeRelationship.PARENT]: result.relationships[NodeRelationship.PARENT] ? transformRef(result.relationships[NodeRelationship.PARENT]) : undefined,
      // TODO: support CHILDREN
      // TODO: support SOURCE
    },
  });
}

function transformRef (rel: RetrievedChunkReference): RelatedNodeType<any> {
  return {
    nodeId: rel.chunk_node_id,
    nodeType: ObjectType.TEXT,
    metadata: rel.metadata,
  };
}