import { authenticationHeaders, handleResponse, requestUrl } from '@/lib/request';
import { z, type ZodType } from 'zod';

export type IndexProgress = {
  not_started?: number
  pending?: number
  running?: number
  completed?: number
  failed?: number
}

export type IndexTotalStats = {
  total: number
}

export interface RagIndexProgress {
  kg_index: IndexProgress;
  vector_index: IndexProgress;
  documents: IndexTotalStats;
  chunks: IndexTotalStats;
  entities: IndexTotalStats;
  relationships: IndexTotalStats;
}

export const totalSchema = z.object({
  total: z.number(),
}) satisfies ZodType<IndexTotalStats>;

export const indexSchema = z.object({
  not_started: z.number().optional(),
  pending: z.number().optional(),
  running: z.number().optional(),
  completed: z.number().optional(),
  failed: z.number().optional(),
}) satisfies ZodType<IndexProgress>;

const ragIndexProgressSchema = z.object({
  kg_index: indexSchema,
  vector_index: indexSchema,
  documents: totalSchema,
  chunks: totalSchema,
  entities: totalSchema,
  relationships: totalSchema,
}) satisfies ZodType<RagIndexProgress>;

export async function getIndexProgress () {
  return await fetch(requestUrl('/api/v1/admin/rag/index-progress'), {
    headers: await authenticationHeaders(),
  })
    .then(handleResponse(ragIndexProgressSchema));
}
