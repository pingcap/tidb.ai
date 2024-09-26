import { authenticationHeaders, handleErrors, handleResponse, type Page, type PageParams, requestUrl, zodPage } from '@/lib/request';
import { zodJsonDate } from '@/lib/zod';
import { z, type ZodType } from 'zod';

export interface ChatEngine {
  id: number;
  name: string;
  updated_at: Date;
  created_at: Date;
  deleted_at: Date | null;
  engine_options: ChatEngineOptions;
  llm_id: number | null;
  fast_llm_id: number | null;
  reranker_id: number | null;
  is_default: boolean;
}

export interface ChatEngineOptions {
  knowledge_graph: ChatEngineKnowledgeGraphOptions;
  llm: ChatEngineLLMOptions;
  post_verification_url?: string | null;
  post_verification_token?: string | null;
}

export interface ChatEngineKnowledgeGraphOptions {
  depth: number;
  enabled: boolean;
  include_meta: boolean;
  with_degree: boolean;
  using_intent_search: boolean;
}

export type ChatEngineLLMOptions = {
  condense_question_prompt: string;
  text_qa_prompt: string;
  refine_prompt: string;

  intent_graph_knowledge: string
  normal_graph_knowledge: string

  // provider: string;
  // reranker_provider: string;
  // reranker_top_k: number;
}

const kgOptionsSchema = z.object({
  depth: z.number(),
  enabled: z.boolean(),
  include_meta: z.boolean(),
  with_degree: z.boolean(),
  using_intent_search: z.boolean(),
}) satisfies ZodType<ChatEngineKnowledgeGraphOptions>;

const llmOptionsSchema =
  z.object({
    condense_question_prompt: z.string(),
    text_qa_prompt: z.string(),
    refine_prompt: z.string(),
    intent_graph_knowledge: z.string(),
    normal_graph_knowledge: z.string(),
    // provider: z.string(),
    // reranker_provider: z.string(),
    // reranker_top_k: z.number(),
  }).passthrough() as ZodType<ChatEngineLLMOptions, any, any>;

const chatEngineOptionsSchema = z.object({
  knowledge_graph: kgOptionsSchema,
  llm: llmOptionsSchema,
  post_verification_url: z.string().nullable().optional(),
  post_verification_token: z.string().nullable().optional(),
}) satisfies ZodType<ChatEngineOptions, any, any>;

const chatEngineSchema = z.object({
  id: z.number(),
  name: z.string(),
  updated_at: zodJsonDate(),
  created_at: zodJsonDate(),
  deleted_at: zodJsonDate().nullable(),
  engine_options: chatEngineOptionsSchema,
  llm_id: z.number().nullable(),
  fast_llm_id: z.number().nullable(),
  reranker_id: z.number().nullable(),
  is_default: z.boolean(),
}) satisfies ZodType<ChatEngine, any, any>;

export async function listChatEngines ({ page = 1, size = 10 }: PageParams = {}): Promise<Page<ChatEngine>> {
  return await fetch(requestUrl('/api/v1/admin/chat-engines', { page, size }), {
    headers: await authenticationHeaders(),
  })
    .then(handleResponse(zodPage(chatEngineSchema)));
}

export async function getChatEngine (id: number): Promise<ChatEngine> {
  return await fetch(requestUrl(`/api/v1/admin/chat-engines/${id}`), {
    headers: await authenticationHeaders(),
  })
    .then(handleResponse(chatEngineSchema));
}

export async function updateChatEngine (id: number, partial: Partial<Pick<ChatEngine, 'name' | 'llm_id' | 'fast_llm_id' | 'reranker_id' | 'engine_options' | 'is_default'>>): Promise<void> {
  await fetch(requestUrl(`/api/v1/admin/chat-engines/${id}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...await authenticationHeaders(),
    },
    body: JSON.stringify(partial),
  })
    .then(handleErrors);
}

export async function createChatEngine (create: Pick<ChatEngine, 'name' | 'llm_id' | 'fast_llm_id' | 'engine_options'>) {
  return await fetch(requestUrl(`/api/v1/admin/chat-engines`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...await authenticationHeaders(),
    },
    body: JSON.stringify(create),
  })
    .then(handleResponse(chatEngineSchema));
}

export async function deleteChatEngine (id: number): Promise<void> {
  await fetch(requestUrl(`/api/v1/admin/chat-engines/${id}`), {
    method: 'DELETE',
    headers: {
      ...await authenticationHeaders(),
    },
  })
    .then(handleErrors);
}
