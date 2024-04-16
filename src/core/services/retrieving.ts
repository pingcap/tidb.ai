import { AppIndexBaseService, type AppIndexBaseServiceOptions } from '@/core/services/base';
import { Document, getDocuments } from '@/core/repositories/document';
import { createRetrieve, finishRetrieve, type Retrieve, type RetrieveResult, startRetrieveRerank, startRetrieveSearch, terminateRetrieve } from '@/core/repositories/retrieve';
import { getErrorMessage } from '@/lib/errors';
import { getEmbedding } from '@/lib/llamaindex/converters/embedding';
import {ServiceContext} from "llamaindex";
import type { UUID } from 'node:crypto';
import z, { ZodType } from 'zod';

export interface RetrieveOptions {
  search_top_k?: number;
  top_k?: number;
  use_cache?: boolean;
  filters?: {
    namespaces?: number[];
  };
  text: string;
}

export interface RetrievedChunk {
  index_id: number;
  document_id: number;
  document_node_id: UUID;
  document_chunk_node_id: UUID;
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
  onRetrieved: (id: number, retrievedChunk: RetrievedChunk[]) => void;
}

export const retrieveOptionsSchema: ZodType<RetrieveOptions> = z.object({
  search_top_k: z.number().int().optional(),
  reranker: z.object({
    provider: z.string(),
    options: z.any().optional(),
  }).optional(),
  use_cache: z.boolean().optional(),
  filters: z.object({
    namespaces: z.number().int().array().optional(),
  }).optional(),
  text: z.string(),
});

export interface AppRetrieveServiceOptions extends AppIndexBaseServiceOptions {
  serviceContext: ServiceContext;
  reranker?: { provider: string, options?: any };
}

export abstract class AppRetrieveService extends AppIndexBaseService {
  protected readonly serviceContext: ServiceContext;
  protected readonly rerankerOptions?: AppRetrieveServiceOptions['reranker'];

  constructor ({ reranker, serviceContext, ...options }: AppRetrieveServiceOptions) {
    super(options);
    this.rerankerOptions = reranker;
    this.serviceContext = serviceContext;
  }

  async retrieve (options: RetrieveOptions, callbacks?: RetrieveCallbacks): Promise<RetrievedChunk[]> {
    const retrieve = await createRetrieve({
      index_id: this.index.id,
      text: options.text,
      created_at: new Date(),
      options,
      status: 'CREATED',
    });

    try {
      const result = await this.run(retrieve, options);

      await finishRetrieve(retrieve.id, !!this.rerankerOptions, result.map(result => ({
        retrieve_id: retrieve.id,
        relevance_score: result.relevance_score,
        document_id: result.document_id,
        document_chunk_node_id: result.document_chunk_node_id,
        document_node_id: result.document_node_id,
        chunk_metadata: JSON.stringify(result.metadata),
        chunk_text: result.text,
      })));

      callbacks?.onRetrieved(retrieve.id, result);

      return result;
    } catch (e) {
      await terminateRetrieve(retrieve.id, getErrorMessage(e));
      throw e;
    }
  }

  protected async embedQuery (text: string) {
    const embeddings = getEmbedding(this.flow, this.index.config.embedding.provider, this.index.config.embedding.config);
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
