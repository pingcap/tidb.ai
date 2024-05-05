import {Document, getDocuments} from '@/core/repositories/document';
import {
  createRetrieve,
  finishRetrieve,
  type Retrieve,
  type RetrieveResult,
  startRetrieveRerank,
  startRetrieveSearch,
  terminateRetrieve
} from '@/core/repositories/retrieve';
import {AppIndexBaseService, type AppIndexBaseServiceOptions} from '@/core/services/base';
import {getErrorMessage} from '@/lib/errors';
import {buildEmbedding} from '@/lib/llamaindex/builders/embedding';
import {MetadataFilterConfig} from "@/lib/llamaindex/builders/metadata-filter";
import {RerankerConfig, RerankerProvider, RerankerOptions} from "@/lib/llamaindex/builders/reranker";
import {metadataFilterSchema} from "@/lib/llamaindex/postprocessors/postfilters/MetadataPostFilter";
import {ServiceContext} from "llamaindex";
import type {UUID} from 'node:crypto';
import z from "zod";

export const retrieveOptionsSchema = z.object({
  query: z.string(),
  // TODO: using engine name instead.
  engine: z.number().optional(),
  filters: z.array(metadataFilterSchema).optional(),
  search_top_k: z.number().int().optional(),
  top_k:  z.number().int().optional(),
  use_cache: z.boolean().optional(),
});

export type RetrieveOptions = z.infer<typeof retrieveOptionsSchema>;

export interface RetrievedChunk {
  index_id: number;
  document_id: number;
  document_node_id: UUID;
  document_chunk_node_id: UUID;
  document_metadata: any;
  relevance_score: number;
  metadata: any;
  text: string;
  relationships: Record<string, RetrievedChunkReference>;
}

export interface RetrievedChunkReference {
  index_id: number;
  chunk_node_id: UUID;
  metadata: any;
}

export interface RetrieveCallbacks {
  onStartSearch: (id: number, text: string) => void;
  onStartRerank: (id: number, searchedChunks: RetrievedChunk[]) => void;
  onRetrieved: (id: number, retrievedChunks: RetrievedChunk[]) => void;
  onRetrieveFailed: (id: number, reason: unknown) => void;
}

export interface AppRetrieveServiceOptions extends AppIndexBaseServiceOptions {
  serviceContext: ServiceContext;
  reranker?: RerankerConfig;
  metadata_filter?: MetadataFilterConfig;
}

export abstract class AppRetrieveService extends AppIndexBaseService {
  protected readonly serviceContext: ServiceContext;
  protected readonly rerankerConfig?: RerankerConfig;
  protected readonly metadataFilterConfig?: MetadataFilterConfig;

  constructor ({ reranker, metadata_filter, serviceContext, ...options }: AppRetrieveServiceOptions) {
    super(options);
    this.rerankerConfig = reranker;
    this.metadataFilterConfig = metadata_filter;
    this.serviceContext = serviceContext;
  }

  async retrieve (options: RetrieveOptions, callbacks?: RetrieveCallbacks): Promise<RetrievedChunk[]> {
    if (callbacks) {
      this.on('start-search', callbacks.onStartSearch);
      this.on('start-rerank', callbacks.onStartRerank);
    }

    const retrieve = await createRetrieve({
      index_id: this.index.id,
      text: options.query,
      created_at: new Date(),
      options,
      status: 'CREATED',
    });

    try {
      const result = await this.run(retrieve, options);

      await finishRetrieve(retrieve.id, !!this.rerankerConfig, result.map(result => ({
        retrieve_id: retrieve.id,
        relevance_score: result.relevance_score,
        document_id: result.document_id,
        document_chunk_node_id: result.document_chunk_node_id,
        document_node_id: result.document_node_id,
        document_metadata: result.document_metadata,
        chunk_metadata: JSON.stringify(result.metadata),
        chunk_text: result.text,
      })));

      callbacks?.onRetrieved(retrieve.id, result);

      return result;
    } catch (e) {
      await terminateRetrieve(retrieve.id, getErrorMessage(e));
      callbacks?.onRetrieveFailed(retrieve.id, e);
      throw e;
    }
  }

  protected async embedQuery (text: string) {
    const embeddings = await buildEmbedding(this.index.config.embedding);
    return await embeddings.getQueryEmbedding(text);
  }

  protected async startSearch (retrieve: Retrieve) {
    await startRetrieveSearch(retrieve.id);
  }

  protected async startRerank (retrieve: Retrieve) {
    await startRetrieveRerank(retrieve.id);
  }

  protected abstract run (retrieve: Retrieve, options: RetrieveOptions): Promise<RetrievedChunk[]>;

  async extendResultDetails<T extends RetrieveResult | RetrievedChunk> (results: T[]): Promise<Array<T & { document_name: string, document_uri: string, document_created_at: Date, document_last_modified_at: Date }>> {
    const idSet = results.reduce((ids, result) => ids.add(result.document_id), new Set<number>);
    const documents = await getDocuments(idSet);

    const documentsMap = documents.reduce((map, document) => map.set(document.id, document), new Map<number, Document>);

    return results.map(result => {
      const document = documentsMap.get(result.document_id);

      return {
        ...result,
        document_name: document?.name ?? '',
        document_uri: document?.source_uri ?? '',
        document_created_at: document?.created_at ?? new Date(0),
        document_last_modified_at: document?.last_modified_at ?? new Date(0),
      };
    });
  }
}
