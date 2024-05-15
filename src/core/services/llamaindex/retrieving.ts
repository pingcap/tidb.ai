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
import {buildMetadataFilter} from "@/lib/llamaindex/builders/metadata-filter";
import {buildReranker} from "@/lib/llamaindex/builders/reranker";
import {LangfuseTraceClient} from "langfuse";
import {
  type BaseRetriever,
  NodeRelationship,
  type NodeWithScore,
  ObjectType,
  type RetrieveParams,
  TextNode
} from 'llamaindex';
import type {RelatedNodeInfo, RelatedNodeType} from 'llamaindex/Node';
import {DateTime} from "luxon";
import type {UUID} from 'node:crypto';

export class LlamaindexRetrieveService extends AppRetrieveService {
  protected async run (
    retrieve: Retrieve,
    retrieveOptions: RetrieveOptions,
    trace?: LangfuseTraceClient
  ): Promise<RetrievedChunk[]> {
    const { query, top_k = 10, search_top_k = 100, filters} = retrieveOptions;

    if (this.index.config.provider !== 'llamaindex') {
      throw new Error(`${this.index.name} is not a llamaindex index`);
    }

    // Tracing.
    const providedTrace = !!trace;
    if (!providedTrace) {
      trace = this.langfuse?.trace({
        name: 'retrieving',
        input: retrieveOptions.query,
        metadata: {
          retrieveId: retrieve.id,
          ...retrieveOptions
        },
      });
    }

    const retrieveSpan = trace?.span({
      name: 'retrieving',
      input: retrieveOptions.query,
      metadata: {
        retrieveId: retrieve.id,
        ...retrieveOptions
      }
    });

    // Generate query embedding.
    const queryEmbedding = await this.embedQuery(query, retrieveSpan);

    // Embedding search.
    this.emit('start-search', retrieve.id, query);
    await this.startSearch(retrieve);

    let chunks = await this.search(query, queryEmbedding, search_top_k, retrieveSpan);

    // Metadata Filters
    const metadataFilterConfig = this.metadataFilterConfig;
    if (metadataFilterConfig) {
      // If filters are provided, use them directly.
      if (filters) {
        this.metadataFilterConfig.options = Object.assign(this.metadataFilterConfig.options ?? {}, { filters })
      }

      chunks = await this.metadataPostFilter(chunks, query, metadataFilterConfig, retrieveSpan);
    }

    // If no reranker is provided, return the top_k chunks directly.
    if (!this.rerankerConfig?.provider) {
      return chunks.slice(0, top_k);
    }

    // Cut up to 2 * top_k chunks for reranking.
    const rerankChunksLimit = top_k * 2;
    chunks = chunks.slice(0, rerankChunksLimit);

    // Reranking.
    this.emit('start-rerank', retrieve.id, chunks);
    await this.startRerank(retrieve);
    const result = await this.rerank(chunks, query, top_k, this.rerankerConfig, retrieveSpan);

    retrieveSpan?.end({
      output: result
    });

    return result;
  }

  private async search (query: string, queryEmbedding: number[], search_top_k: number, trace?: LangfuseTraceClient) {
    console.log(`Start embedding searching for query "${query}".`, { search_top_k })
    const sSpan = trace?.span({
      name: 'embedding-search',
      input: {
        query,
        queryEmbedding
      },
      metadata: {
        search_top_k
      }
    });

    const searchStart = DateTime.now();
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
        .limit(search_top_k))
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
    const searchDuration = DateTime.now().diff(searchStart, 'milliseconds').milliseconds;
    const result = await this.parse(this.index, rawChunks);

    sSpan?.end({
      output: result
    });
    console.log(`Finish embedding searching, take ${searchDuration} ms, found ${result.length} chunks.`, { search_top_k });

    return result;
  }

  private async metadataPostFilter (
    chunks: RetrievedChunk[],
    query: string,
    config: NonNullable<AppRetrieveServiceOptions['metadata_filter']>,
    trace?: LangfuseTraceClient
  ) {
    console.log(`[Retrieving] Start post metadata filtering with ${chunks.length} chunks.`);
    const mfSpan = trace?.span({
      name: 'metadata-filters',
      input: query,
      metadata: config
    });

    const mfStart = DateTime.now();
    const metadataFilter = buildMetadataFilter(this.serviceContext, config);
    const chunksMap = new Map(chunks.map(chunk => [chunk.document_chunk_node_id, chunk]));
    const nodesWithScore = await metadataFilter.postprocessNodes(chunks.map(chunk => ({ score: chunk.relevance_score, node: transform(chunk) })), query);
    const mfDuration = DateTime.now().diff(mfStart, 'milliseconds').milliseconds;

    const result = nodesWithScore.map((nodeWithScore, index, total) => ({
      ...chunksMap.get(nodeWithScore.node.id_ as UUID)!,
      relevance_score: nodeWithScore.score ?? 0,
    }));

    mfSpan?.end({
      output: result
    });
    console.log(`[Retrieving] Finish post metadata filtering, take ${mfDuration} ms.`)

    return result;
  }

  private async rerank (
    chunks: RetrievedChunk[],
    query: string,
    top_k: number,
    config: NonNullable<AppRetrieveServiceOptions['reranker']>,
    trace?: LangfuseTraceClient
  ) {
    console.log(`Start reranking for query "${query}".`, { chunks: chunks.length, top_k });
    const rerankSpan = trace?.span({
      name: 'reranking',
      input: {
        query,
        chunks
      },
      metadata: config
    });

    const rerankStart = DateTime.now();
    const reranker = await buildReranker(this.serviceContext, config, top_k);
    const chunksMap = new Map(chunks.map(chunk => [chunk.document_chunk_node_id, chunk]));
    const nodesWithScore = await reranker.postprocessNodes(chunks.map(chunk => ({ score: chunk.relevance_score, node: transform(chunk) })), query);
    const rerankDuration = DateTime.now().diff(rerankStart, 'milliseconds').milliseconds;

    const result = nodesWithScore.map((nodeWithScore, index, total) => ({
      ...chunksMap.get(nodeWithScore.node.id_ as UUID)!,
      relevance_score: nodeWithScore.score ?? (total.length - index + top_k * 10),
    }));

    rerankSpan?.end({
      output: result
    });
    console.log(`Finish reranking, take ${rerankDuration} ms.`);
    return result;
  }

  private async parse (index: Index, results: Pick<RetrieveResult, 'relevance_score' | 'document_node_id' | 'document_chunk_node_id' | 'document_id' | 'chunk_text' | 'chunk_metadata' | 'document_metadata'>[]): Promise<RetrievedChunk[]> {
    if (results.length === 0) {
      return [];
    }

    const nodeRelsMap = new Map<UUID, Record<string, RetrievedChunkReference>>;

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
    private readonly options: Omit<RetrieveOptions, 'query'>,
    private readonly callbacks: RetrieveCallbacks,
    private readonly trace?: LangfuseTraceClient
  ) {}

  async retrieve (params: RetrieveParams): Promise<NodeWithScore[]> {
    // Notice: Due to the limitations of Llamaindex, some parameters can only be passed in when instantiating the Retriever class
    const chunks = await this.retrieveService.retrieve({ ...this.options, query: params.query }, this.callbacks, this.trace);

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
    excludedLlmMetadataKeys: [
      // Notice: Exclude several fields generated by the LLM to avoid passing too much text during rerank,
      // which may lead to exceeding the model's token limit.
      'sectionSummary',
      'questionsThisExcerptCanAnswer',
      'excerptKeywords'
    ],
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