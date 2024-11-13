/*
 POST
 /api/v1/admin/knowledge_bases
 Create Knowledge Base



 GET
 /api/v1/admin/knowledge_bases
 List Knowledge Bases



 GET
 /api/v1/admin/knowledge_bases/{knowledge_base_id}
 Get Knowledge Base
 PUT /api/v1/admin/knowledge_bases/{knowledge_base_id}
 Update Knowledge Base Setting
 DELETE /api/v1/admin/knowledge_bases/{knowledge_base_id}
 Delete Knowledge Base
 GET
 /api/v1/admin/knowledge_bases/{knowledge_base_id}/overview
 Get Knowledge Base Index Overview
 GET
 /api/v1/admin/knowledge_bases/{kb_id}/documents
 List Knowledge Base Documents
 GET
 /api/v1/admin/knowledge_bases/{kb_id}/documents/{doc_id}/chunks
 List Knowledge Base Chunks
 POST
 /api/v1/admin/knowledge_bases/{kb_id}/documents/reindex
 Batch Reindex Knowledge Base Documents
 POST
 /api/v1/admin/knowledge_bases/{kb_id}/retry-failed-index-tasks
 Retry Failed Tasks
 */

import { type BaseCreateDatasourceParams, type CreateDatasourceSpecParams, type Datasource, type DatasourceKgIndexError, datasourceSchema, type DatasourceVectorIndexError } from '@/api/datasources';
import { type EmbeddingModelSummary, embeddingModelSummarySchema } from '@/api/embedding-models';
import { type LLMSummary, llmSummarySchema } from '@/api/llms';
import { type IndexProgress, indexSchema, indexStatusSchema, type IndexTotalStats, totalSchema } from '@/api/rag';
import { authenticationHeaders, handleErrors, handleResponse, type PageParams, requestUrl, zodPage } from '@/lib/request';
import { zodJsonDate } from '@/lib/zod';
import { z, type ZodType } from 'zod';

/**
 * {
 *     "id": 1,
 *     "name": "Lorem Ipsum",
 *     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
 *     "data_sources": [
 *         {
 *             "id": 630003,
 *             "name": "Test",
 *             "data_source_type": "file",
 *             "config": [
 *                 {
 *                     "file_id": 300004,
 *                     "file_name": "b (1).txt"
 *                 }
 *             ]
 *         }
 *     ],
 *     "index_methods": [
 *         "vector"
 *     ],
 *     "llm": {
 *         "id": 30002,
 *         "name": "gemini-1.5-flash",
 *         "provider": "gemini",
 *         "model": "models/gemini-1.5-flash",
 *         "is_default": true
 *     },
 *     "embedding_model": {
 *         "id": 60001,
 *         "name": "test",
 *         "model": "text-embedding-3-small",
 *         "vector_dimension": 0,
 *         "is_default": true
 *     },
 *     "creator": {
 *         "id": "01907db8-8850-795d-855b-552663c18c9f"
 *     },
 *     "created_at": "2024-11-08T09:29:11",
 *     "updated_at": "2024-11-08T09:29:11"
 * }
 */

export interface CreateKnowledgeBaseParams {
  name: string;
  description: string;
  index_methods: ('vector' | 'knowledge_graph')[];
  llm_id?: number | null;
  embedding_model_id?: number | null;
  data_sources: (BaseCreateDatasourceParams & CreateDatasourceSpecParams)[];
}

export interface KnowledgeBaseSummary {
  id: number;
  name: string;
  description: string;
  index_methods: ('vector' | 'knowledge_graph')[];
  created_at: Date;
  updated_at: Date;
  creator: {
    id: string;
  };
}

export interface KnowledgeBase extends KnowledgeBaseSummary {
  data_sources: Datasource[];
  llm?: LLMSummary | null;
  embedding_model?: EmbeddingModelSummary | null;
}

export type KnowledgeGraphIndexProgress = {
  vector_index: IndexProgress
  documents: IndexTotalStats
  chunks: IndexTotalStats
  kg_index?: IndexProgress
  relationships?: IndexTotalStats
}

export type KnowledgeGraphDocumentChunk = z.infer<typeof knowledgeGraphDocumentChunkSchema>;

const knowledgeBaseSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  index_methods: z.enum(['vector', 'knowledge_graph']).array(),
  created_at: zodJsonDate(),
  updated_at: zodJsonDate(),
  creator: z.object({
    id: z.string(),
  }),
}) satisfies ZodType<KnowledgeBaseSummary, any, any>;

const knowledgeBaseSchema = knowledgeBaseSummarySchema.extend({
  data_sources: datasourceSchema.array(),
  llm: llmSummarySchema.nullable().optional(),
  embedding_model: embeddingModelSummarySchema.nullable().optional(),
}) satisfies ZodType<KnowledgeBase, any, any>;

const knowledgeGraphIndexProgressSchema = z.object({
  vector_index: indexSchema,
  documents: totalSchema,
  chunks: totalSchema,
  kg_index: indexSchema.optional(),
  relationships: totalSchema.optional(),
}) satisfies ZodType<KnowledgeGraphIndexProgress>;

const knowledgeGraphDocumentChunkSchema = z.object({
  id: z.string(),
  document_id: z.number(),
  hash: z.string(),
  text: z.string(),
  meta: z.object({}).passthrough(),
  embedding: z.number().array(),
  relations: z.any(),
  source_uri: z.string(),
  index_status: indexStatusSchema,
  index_result: z.string().nullable(),
  created_at: zodJsonDate(),
  updated_at: zodJsonDate(),
});

const vectorIndexErrorSchema = z.object({
  document_id: z.number(),
  document_name: z.string(),
  source_uri: z.string(),
  error: z.string().nullable(),
}) satisfies ZodType<DatasourceVectorIndexError, any, any>;

const kgIndexErrorSchema = z.object({
  chunk_id: z.string(),
  source_uri: z.string(),
  error: z.string().nullable(),
}) satisfies ZodType<DatasourceKgIndexError, any, any>;

export async function listKnowledgeBases ({ page = 1, size = 10 }: PageParams) {
  return await fetch(requestUrl('/api/v1/admin/knowledge_bases', { page, size }), {
    headers: await authenticationHeaders(),
  })
    .then(handleResponse(zodPage(knowledgeBaseSummarySchema)));
}

export async function getKnowledgeBaseById (id: number) {
  return await fetch(requestUrl(`/api/v1/admin/knowledge_bases/${id}`), {
    headers: await authenticationHeaders(),
  })
    .then(handleResponse(knowledgeBaseSchema));
}

export async function getKnowledgeBaseDocumentChunks (id: number, documentId: number) {
  return await fetch(requestUrl(`/api/v1/admin/knowledge_bases/${id}/documents/${documentId}/chunks`), {
    headers: await authenticationHeaders(),
  })
    .then(handleResponse(knowledgeGraphDocumentChunkSchema.array()));
}

export async function createKnowledgeBase (params: CreateKnowledgeBaseParams) {
  return await fetch(requestUrl('/api/v1/admin/knowledge_bases'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...await authenticationHeaders(),
    },
    body: JSON.stringify(params),
  }).then(handleResponse(knowledgeBaseSchema));
}

export async function getKnowledgeGraphIndexProgress (id: number): Promise<KnowledgeGraphIndexProgress> {
  return fetch(requestUrl(`/api/v1/admin/knowledge_bases/${id}/overview`), {
    headers: await authenticationHeaders(),
  }).then(handleResponse(knowledgeGraphIndexProgressSchema));
}

export async function listKnowledgeBaseVectorIndexErrors (id: number, { page = 1, size = 10 }: PageParams = {}) {
  return fetch(requestUrl(`/api/v1/admin/knowledge_base/${id}/vector-index-errors`, { page, size }), {
    headers: await authenticationHeaders(),
  }).then(handleResponse(zodPage(vectorIndexErrorSchema)));
}

export async function listKnowledgeBaseKgIndexErrors (id: number, { page = 1, size = 10 }: PageParams = {}) {
  return fetch(requestUrl(`/api/v1/admin/knowledge_base/${id}/kg-index-errors`, { page, size }), {
    headers: await authenticationHeaders(),
  }).then(handleResponse(zodPage(kgIndexErrorSchema)));
}

export async function retryKnowledgeBaseAllFailedTasks (id: number) {
  return fetch(requestUrl(`/api/v1/admin/knowledge_base/${id}/retry-failed-tasks`), {
    method: 'POST',
    headers: {
      ...await authenticationHeaders(),
      'Content-Type': 'application/json',
    },
  }).then(handleErrors);
}