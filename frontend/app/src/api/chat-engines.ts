import { BASE_URL, buildUrlParams, handleResponse, opaqueCookieHeader, type Page, type PageParams, zodPage } from '@/lib/request';
import { zodJsonDate } from '@/lib/zod';
import { z, type ZodType } from 'zod';

export interface ChatEngine {
  id: number;
  name: string;
  updated_at: Date;
  created_at: Date;
  deleted_at: Date | null;
  engine_options: ChatEngineOptions;
  is_default: boolean;
}

export interface ChatEngineOptions {
  knowledge_graph: ChatEngineKnowledgeGraphOptions;
  llm: ChatEngineLLMOptions;
}

export interface ChatEngineKnowledgeGraphOptions {
  depth: number;
  enabled: boolean;
  include_meta: boolean;
  with_degree: boolean;
}

export interface ChatEngineLLMOptions {
  condense_question_prompt: string;
  text_qa_prompt: string;
  refine_prompt: string;

  gemini_chat_model: string;
  openai_chat_model: string;
  provider: string;
  reranker_provider: string;
  reranker_top_k: number;
}

const kgOptionsSchema = z.object({
  depth: z.number(),
  enabled: z.boolean(),
  include_meta: z.boolean(),
  with_degree: z.boolean(),
}) satisfies ZodType<ChatEngineKnowledgeGraphOptions>;

const llmOptionsSchema = z.object({
  condense_question_prompt: z.string(),
  text_qa_prompt: z.string(),
  refine_prompt: z.string(),
  gemini_chat_model: z.string(),
  openai_chat_model: z.string(),
  provider: z.string(),
  reranker_provider: z.string(),
  reranker_top_k: z.number(),
}) satisfies ZodType<ChatEngineLLMOptions>;

const chatEngineOptionsSchema = z.object({
  knowledge_graph: kgOptionsSchema,
  llm: llmOptionsSchema,
}) satisfies ZodType<ChatEngineOptions>;

const chatEngineSchema = z.object({
  id: z.number(),
  name: z.string(),
  updated_at: zodJsonDate(),
  created_at: zodJsonDate(),
  deleted_at: zodJsonDate().nullable(),
  engine_options: chatEngineOptionsSchema,
  is_default: z.boolean(),
}) satisfies ZodType<ChatEngine, any, any>;

export async function listChatEngines ({ page = 1, size = 10 }: PageParams = {}): Promise<Page<ChatEngine>> {
  return await fetch(BASE_URL + '/api/v1/admin/chat-engines' + '?' + buildUrlParams({ page, size }), {
    headers: await opaqueCookieHeader(),
  })
    .then(handleResponse(zodPage(chatEngineSchema)));
}

export async function getChatEngine (id: number): Promise<ChatEngine> {
  return await fetch(BASE_URL + `/api/v1/admin/chat-engines/${id}`, {
    headers: await opaqueCookieHeader(),
  })
    .then(handleResponse(chatEngineSchema));
}
