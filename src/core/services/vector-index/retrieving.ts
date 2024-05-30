import {getDb} from '@/core/db';
import type {Index} from '@/core/repositories/index_';
import type {Retrieve, RetrieveResult} from '@/core/repositories/retrieve';
import {
  AppRetrieveService,
  type RetrieveCallbacks,
  type RetrievedChunk,
  type RetrievedChunkReference,
  type RetrieveOptions
} from '@/core/services/retrieving';
import {cosineDistance} from '@/lib/kysely';
import {buildMetadataFilter} from "@/lib/llamaindex/builders/metadata-filter";
import {buildReranker} from "@/lib/llamaindex/builders/reranker";
import {MetadataFieldFilter} from "@/lib/llamaindex/config/metadata-filter";
import {LangfuseTraceClient} from "langfuse";
import {
  BaseNodePostprocessor,
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
    options: RetrieveOptions,
    trace?: LangfuseTraceClient
  ): Promise<RetrievedChunk[]> {
    const { query, top_k = 10, search_top_k = 100, filters} = options;

    if (this.index.config.provider !== 'llamaindex') {
      throw new Error(`${this.index.name} is not a llamaindex index`);
    }

    // Init Tracing.
    const providedTrace = !!trace;
    if (!providedTrace) {
      trace = this.langfuse?.trace({
        name: 'retrieving',
        input: options.query,
        metadata: {
          retrieve_id: retrieve.id,
          top_k: options.top_k,
          search_top_k: options.search_top_k,
        },
      });
    }

    const retrieveSpan = trace?.span({
      name: 'retrieving',
      input: options.query,
      metadata: {
        retrieveId: retrieve.id,
        ...options
      }
    });

    // Generate query embedding.
    const queryEmbedding = await this.embedQuery(query, retrieveSpan);

    // Embedding search.
    this.emit('start-search', retrieve.id, query);
    await this.startSearch(retrieve);

    let chunks = await this.search(query, queryEmbedding, search_top_k, retrieveSpan);

    // Metadata Filters
    chunks = await this.metadataPostFilter(query, chunks, filters, retrieveSpan);

    // Reranking.
    this.emit('start-rerank', retrieve.id, chunks);
    await this.startRerank(retrieve);

    chunks = await this.rerank(chunks, query, top_k, retrieveSpan);

    retrieveSpan?.end({
      output: chunks
    });

    return chunks;
  }

  private async search (
    query: string,
    queryEmbedding: number[],
    search_top_k: number,
    trace?: LangfuseTraceClient
  ) {
    console.log(`[Retrieving] Start embedding searching for query "${query}".`, { search_top_k })
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
    console.log(`[Retrieving] Finish embedding searching, take ${searchDuration} ms, found ${result.length} chunks.`, { search_top_k });

    return result;
  }

  private async metadataPostFilter (
    query: string,
    chunks: RetrievedChunk[],
    filters: MetadataFieldFilter[] | undefined,
    trace?: LangfuseTraceClient
  ): Promise<RetrievedChunk[]> {
    // If no metadata filter config is provided, return the chunks directly.
    if (!this.metadataFilterConfig) {
      return chunks;
    }

    // If filters are provided, use them directly.
    if (filters) {
      if (!this.metadataFilterConfig.options) {
        this.metadataFilterConfig.options = { filters };
      } else {
        this.metadataFilterConfig.options.filters = filters;
      }
    }

    const metadataFilter = buildMetadataFilter(this.serviceContext, this.metadataFilterConfig);
    const span = trace?.span({
      name: 'metadata-filters',
      input: query,
      metadata: this.metadataFilterConfig
    });
    const processedChunks = await this.processRetrievedChunks('metadata-filtering', metadataFilter, query, chunks);
    span?.end({
      output: processedChunks
    });
    return processedChunks;
  }

  private async rerank (
    chunks: RetrievedChunk[],
    query: string,
    top_k: number,
    trace?: LangfuseTraceClient
  ): Promise<RetrievedChunk[]> {
    if (!this.rerankerConfig?.provider) {
      return chunks.slice(0, top_k);
    }

    // Notice: cut up to 2 * top_k chunks for reranking to avoid passing too much text to the reranker.
    // FIXME: why not to use the `search_top_k`?
    chunks = chunks.slice(0, top_k * 2);

    const span = trace?.span({
      name: 'reranking',
      input: { query, chunks },
      metadata: this.rerankerConfig
    });
    let processedChunks;
    try {
      const reranker = await buildReranker(this.serviceContext, this.rerankerConfig, top_k);
      processedChunks = await this.processRetrievedChunks('reranking', reranker, query, chunks);
    } catch(err) {
      console.warn('[Retrieving] Failed to rerank, fallback to slice top_k chunks directly:', err);
      processedChunks = chunks.slice(0, top_k);
    } finally {
      span?.end({
        output: processedChunks
      });
    }
    return processedChunks;
  }

  private async processRetrievedChunks(processName: string, postNodeProcessor: BaseNodePostprocessor, query: string, chunks: RetrievedChunk[]) {
    const chunksMap = new Map(chunks.map(chunk => [chunk.document_chunk_node_id, chunk]));
    const nodes = chunks.map(chunk => this.transformChunkToNode(chunk));

    console.log(`[Retrieving] Start post processing (${processName}) with ${nodes.length} nodes.`);
    const start = DateTime.now();
    const nodesWithScore = await postNodeProcessor.postprocessNodes(nodes, query);
    const duration = DateTime.now().diff(start, 'milliseconds').milliseconds;
    console.log(`[Retrieving] Finish post processing (${processName}) with ${nodesWithScore.length} nodes, take ${duration} ms.`)

    return nodesWithScore.map((nodeWithScore, index, total) => ({
      ...chunksMap.get(nodeWithScore.node.id_ as UUID)!,
      relevance_score: nodeWithScore.score ?? 0,
    }));
  }

  private transformChunkToNode(chunk: RetrievedChunk): NodeWithScore {
    const node = new TextNode({
      id_: chunk.document_chunk_node_id,
      text: chunk.text,
      metadata: {
        ...chunk.metadata,
        ...chunk.document_metadata
      },
      excludedLlmMetadataKeys: [
        // Notice: Exclude several fields generated by the LLM to avoid passing too much text during rerank,
        // which may lead to exceeding the model's token limit.
        'sectionSummary',
        'questionsThisExcerptCanAnswer',
        'excerptKeywords'
      ],
      relationships: {
        [NodeRelationship.NEXT]: chunk.relationships[NodeRelationship.NEXT] ? this.transformChunkRefToRel(chunk.relationships[NodeRelationship.NEXT]) : undefined,
        [NodeRelationship.PREVIOUS]: chunk.relationships[NodeRelationship.PREVIOUS] ? this.transformChunkRefToRel(chunk.relationships[NodeRelationship.PREVIOUS]) : undefined,
        [NodeRelationship.PARENT]: chunk.relationships[NodeRelationship.PARENT] ? this.transformChunkRefToRel(chunk.relationships[NodeRelationship.PARENT]) : undefined,
      },
    });

    return { node, score: chunk.relevance_score };
  }

  private transformChunkRefToRel(rel: RetrievedChunkReference): RelatedNodeType<any> {
    return {
      nodeId: rel.chunk_node_id,
      nodeType: ObjectType.TEXT,
      metadata: rel.metadata,
    };
  }

  private async parse(index: Index, results: Pick<RetrieveResult, 'relevance_score' | 'document_node_id' | 'document_chunk_node_id' | 'document_id' | 'chunk_text' | 'chunk_metadata' | 'document_metadata'>[]): Promise<RetrievedChunk[]> {
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

export class TiDBAIVectorIndexRetriever implements BaseRetriever {
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

