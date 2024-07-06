import { BASE_URL, handleResponse, opaqueCookieHeader } from '@/lib/request';
import { z, type ZodType } from 'zod';

export type IndexProgress = {
  not_started?: number
  pending?: number
  running?: number
  completed?: number
  failed?: number
}

export interface RagIndexProgress {
  kg_index: IndexProgress;
  vector_index: IndexProgress;
  documents: {
    total: number
  };
  chunks: {
    total: number
  };
  entities: {
    total: number
  };
  relationships: {
    total: number
  };
}

const totalSchema = z.object({
  total: z.number(),
});

const indexSchema = z.object({
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
  return await fetch(BASE_URL + '/api/v1/admin/rag/index-progress', {
    headers: await opaqueCookieHeader(),
  })
    .then(handleResponse(ragIndexProgressSchema));
}
