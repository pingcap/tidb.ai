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

import { type BaseCreateDatasourceParams, type CreateDatasourceSpecParams, type Datasource, datasourceSchema } from '@/api/datasources';
import { handleResponse, type PageParams, requestUrl, zodPage } from '@/lib/request';
import { z, type ZodType } from 'zod';

export interface CreateKnowledgeBaseParams {
  name: string;
  description: string;
  index_methods: string[];
  llm_id: number;
  embedding_model_id: number;
  data_sources: (BaseCreateDatasourceParams & CreateDatasourceSpecParams)[];
}

export interface KnowledgeBase {
  name: string;
  description: string;
  index_methods: string[];
  llm_id: number;
  embedding_model_id: number;
  data_sources: Datasource[];
}

const knowledgeBaseSchema = z.object({
  name: z.string(),
  description: z.string(),
  index_methods: z.string().array(),
  llm_id: z.number(),
  embedding_model_id: z.number(),
  data_sources: datasourceSchema.array(),
}) satisfies ZodType<KnowledgeBase, any, any>;

export async function listKnowledgeBases ({ page = 1, size = 10 }: PageParams) {
  return await fetch(requestUrl('/api/v1/admin/knowledge_bases', { page, size }))
    .then(handleResponse(zodPage(knowledgeBaseSchema)));
}
