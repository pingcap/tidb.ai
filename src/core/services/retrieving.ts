import { Document, getDocuments } from '@/core/v1/document';
import { getIndex, type Index } from '@/core/v1/index_';
import { createRetrieve, finishRetrieve, type RetrieveResult, startRetrieveRerank, startRetrieveSearch, terminateRetrieve } from '@/core/v1/retrieve';
import { getErrorMessage } from '@/lib/errors';
import { notFound } from 'next/navigation';
import type { UUID } from 'node:crypto';
import z, { ZodType } from 'zod';

export interface RetrieveOptions {
  search_top_k?: number;
  top_k?: number;
  reranker?: { provider: string, options?: any };
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

export type RetrieveProcessor = (index: Index, options: RetrieveOptions, callbacks: {
  onStartSearch?: () => Promise<void>
  onStartRerank?: () => Promise<void>
}) => Promise<RetrievedChunk[]>

export type RetrievedResultsParser = (index: Index, results: Pick<RetrieveResult, 'relevance_score' | 'document_node_id' | 'document_chunk_node_id' | 'document_id' | 'chunk_text' | 'chunk_metadata'>[]) => Promise<RetrievedChunk[]>

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

export type RetrieveCallbacks = {
  onRetrieved: (id: number, retrievedChunk: RetrievedChunk[]) => void;
}

export async function retrieve (indexId: number, options: RetrieveOptions, processor: RetrieveProcessor, callbacks?: RetrieveCallbacks) {
  const index = await getIndex(indexId);
  if (!index) {
    notFound();
  }

  const retrieve = await createRetrieve({
    index_id: indexId,
    text: options.text,
    created_at: new Date(),
    options,
    status: 'CREATED',
  });

  try {
    const result = await processor(index, options, {
      async onStartSearch () {
        await startRetrieveSearch(retrieve.id);
      },
      async onStartRerank () {
        await startRetrieveRerank(retrieve.id);
      },
    });

    await finishRetrieve(retrieve.id, !!options.reranker, result.map(result => ({
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

export async function extendRetrieveResultDetails<T extends RetrieveResult | RetrievedChunk> (results: T[]): Promise<Array<T & { document_name: string, document_uri: string, document_created_at: Date, document_last_modified_at: Date }>> {
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
