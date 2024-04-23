import {getDb} from '@/core/db';
import type {Index} from '@/core/repositories/index_';
import type {Retrieve, RetrieveResult} from '@/core/repositories/retrieve';
import {
  AppRetrieveService,
  type AppRetrieveServiceOptions,
  type RetrieveCallbacks,
  type RetrievedChunk,
  type RetrievedChunkReference,
  type RetrieveOptions
} from '@/core/services/retrieving';
import {cosineDistance} from '@/lib/kysely';
import {getMetadataFilter} from "@/lib/llamaindex/converters/metadata-filter";
import {getReranker} from "@/lib/llamaindex/converters/reranker";
import {
  type BaseRetriever,
  NodeRelationship,
  type NodeWithScore,
  ObjectType,
  type RetrieveParams,
  type ServiceContext,
  TextNode
} from 'llamaindex';
import type {RelatedNodeInfo, RelatedNodeType} from 'llamaindex/Node';
import {DateTime} from "luxon";
import type {UUID} from 'node:crypto';

export class LlamaindexRetrieveService extends AppRetrieveService {
  protected async run (retrieve: Retrieve, {
    text, top_k = 10, search_top_k = 50, filters = {}, use_cache,
  }: RetrieveOptions): Promise<RetrievedChunk[]> {
    if (this.index.config.provider !== 'llamaindex') {
      throw new Error(`${this.index.name} is not a llamaindex index`);
    }

    const queryEmbedding = await this.embedQuery(text);

    this.emit('start-search', retrieve.id, text);
    await this.startSearch(retrieve);

    console.log(`Start embedding searching for query "${text}".`, { search_top_k })
    const searchStart = DateTime.now();
    let chunks = await this.search(queryEmbedding, search_top_k);
    const searchEnd = DateTime.now();
    const searchDuration = searchEnd.diff(searchStart, 'milliseconds').milliseconds;
    console.log(`Finish embedding searching, take ${searchDuration} ms, found ${chunks.length} chunks.`, { search_top_k });

    if (this.metadataFilterOptions) {
      console.log('Start post filtering chunks by metadata.');
      const filterStart = DateTime.now();
      const filteredResult = await this.metadataPostFilter(chunks, text, this.metadataFilterOptions);
      chunks = filteredResult.slice(0, top_k);
      const filterEnd = DateTime.now();
      const filterDuration = filterEnd.diff(filterStart, 'milliseconds').milliseconds;
      console.log(`Finish post  filtering chunks by metadata, take ${filterDuration} ms.`);
    }

    // If no reranker is provided, return the top_k chunks directly.
    if (!this.rerankerOptions?.provider) {
      return chunks.slice(0, top_k);
    }

    this.emit('start-rerank', retrieve.id, chunks);
    await this.startRerank(retrieve);

    console.log(`Start reranking for query "${text}".`, { top_k });
    const rerankStart = DateTime.now();
    const rerankedResult = await this.rerank(chunks, text, top_k, this.rerankerOptions);
    const rerankEnd = DateTime.now();
    const rerankDuration = rerankEnd.diff(rerankStart, 'milliseconds').milliseconds;
    console.log(`Finish reranking, take ${rerankDuration} ms.`);

    return rerankedResult;
  }

  private async search (queryEmbedding: number[], top_k: number) {
    const rawChunks = await getDb()
      .with('cte_chunk_node', qc => qc.selectFrom(`llamaindex_document_chunk_node_${this.index.name}`)
        .select([
          'id',
          'document_id',
          'text',
          'metadata',
          eb => eb.fn('bin_to_uuid', [`llamaindex_document_chunk_node_${this.index.name}.id`]).as('document_chunk_node_id'),
          `llamaindex_document_chunk_node_${this.index.name}.text as chunk_text`,
          eb => eb.ref(`llamaindex_document_chunk_node_${this.index.name}.metadata`).$castTo<any>().as('chunk_metadata'),
          eb => cosineDistance(eb, 'embedding', queryEmbedding).as('cosine_distance'),
        ])
        .orderBy(eb => cosineDistance(eb, 'embedding', queryEmbedding), 'asc')
        .limit(top_k))
      .selectFrom('cte_chunk_node')
      .innerJoin('llamaindex_document_node as document_node', `cte_chunk_node.document_id`, 'document_node.document_id')
      .select([
        eb => eb.fn('bin_to_uuid', [`cte_chunk_node.id`]).as('document_chunk_node_id'),
        eb => eb.fn('bin_to_uuid', ['document_node.id']).as('document_node_id'),
        'document_node.document_id',
        `cte_chunk_node.text as chunk_text`,
        eb => eb(eb.val(1),'-', eb.ref('cte_chunk_node.cosine_distance')).as('relevance_score'),
        eb => eb.ref(`cte_chunk_node.metadata`).$castTo<any>().as('chunk_metadata'),
        eb => eb.ref(`document_node.metadata`).$castTo<any>().as('document_metadata'),
      ])
      .orderBy('relevance_score', 'desc')
      .execute();
    return await this.parse(this.index, rawChunks);
  }

  private async metadataPostFilter (chunks: RetrievedChunk[], query: string, metadataFilterOptions: NonNullable<AppRetrieveServiceOptions['metadata_filter']>) {
    const metadataFilter = getMetadataFilter(this.serviceContext, metadataFilterOptions.provider, metadataFilterOptions.config);
    const chunksMap = new Map(chunks.map(chunk => [chunk.document_chunk_node_id, chunk]));
    const nodesWithScore = await metadataFilter.postprocessNodes(chunks.map(chunk => ({ score: chunk.relevance_score, node: transform(chunk) })), query);

    return nodesWithScore.map((nodeWithScore, index, total) => ({
      ...chunksMap.get(nodeWithScore.node.id_ as UUID)!,
      relevance_score: nodeWithScore.score ?? 0,
    }));
  }

  private async rerank (chunks: RetrievedChunk[], text: string, top_k: number, rerankerOptions: NonNullable<AppRetrieveServiceOptions['reranker']>) {
    const reranker = getReranker(this.serviceContext, rerankerOptions.provider, rerankerOptions.config, top_k);
    const chunksMap = new Map(chunks.map(chunk => [chunk.document_chunk_node_id, chunk]));
    const nodesWithScore = await reranker.postprocessNodes(chunks.map(chunk => ({ score: chunk.relevance_score, node: transform(chunk) })), text);

    return nodesWithScore.map((nodeWithScore, index, total) => ({
      ...chunksMap.get(nodeWithScore.node.id_ as UUID)!,
      relevance_score: nodeWithScore.score ?? (total.length - index + top_k * 10),
    }));
  }

  private async parse (index: Index, results: Pick<RetrieveResult, 'relevance_score' | 'document_node_id' | 'document_chunk_node_id' | 'document_id' | 'chunk_text' | 'chunk_metadata' | 'document_metadata'>[]): Promise<RetrievedChunk[]> {
    if (results.length === 0) {
      return [];
    }

    //// FIXME: Do we need relationships when retrieving?

    // const relationships = await getDb()
    //   .selectFrom('llamaindex_node_relationship as rel')
    //   .innerJoin(`llamaindex_document_chunk_node_${index.name} as target_chunk_node`, 'rel.target_node_id', `target_chunk_node.id`)
    //   .select([
    //     eb => eb.fn('bin_to_uuid', ['rel.source_node_id']).as('source_node_id'),
    //     eb => eb.fn('bin_to_uuid', ['rel.target_node_id']).as('target_node_id'),
    //     'rel.type',
    //     'target_chunk_node.metadata',
    //   ])
    //   .where('rel.source_node_id', 'in', results.map(result => uuidToBin(result.document_chunk_node_id)))
    //   .execute();

    const nodeRelsMap = new Map<UUID, Record<string, RetrievedChunkReference>>;

    // for (let relationship of relationships) {
    //   let rels = nodeRelsMap.get(relationship.source_node_id);
    //   if (!rels) {
    //     nodeRelsMap.set(relationship.source_node_id, rels = {});
    //   }
    //   rels[relationship.type] = {
    //     index_id: index.id,
    //     metadata: relationship.metadata,
    //     chunk_node_id: relationship.target_node_id,
    //   };
    // }

    return results.map(result => ({
      index_id: index.id,
      metadata: result.chunk_metadata,
      text: result.chunk_text,
      document_node_id: result.document_node_id,
      document_chunk_node_id: result.document_chunk_node_id,
      document_id: result.document_id,
      document_metadata: result.document_metadata,
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
    const chunks = await this.retrieveService.retrieve({ ...this.options, text: params.query, filters: params.preFilters as Record<string, any> }, this.callbacks);

    const detailedChunks = await this.retrieveService.extendResultDetails(chunks);

    return detailedChunks.map(chunk => {
      return {
        node: new TextNode({
          id_: chunk.document_chunk_node_id,
          text: chunk.text,
          metadata: {
            //// MARK: we don't need the metadata from extractors, they are for embedding.
            // ...chunk.metadata,
            sourceUri: chunk.document_uri,
          },
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
    metadata: {
      ...result.metadata,
      ...result.document_metadata
    },
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