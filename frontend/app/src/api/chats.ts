import type { ChatEngineOptions } from '@/api/chat-engines';
import { type KnowledgeGraph, knowledgeGraphSchema } from '@/api/graph';
import { BASE_URL, buildUrlParams, handleErrors, handleResponse, opaqueCookieHeader, type Page, type PageParams, zodPage } from '@/lib/request';
import { zodJsonDate } from '@/lib/zod';
import { parseStreamPart } from 'ai';
import { z } from 'zod';

export interface Chat {
  title: string;
  engine_id: number;
  engine_options: ChatEngineOptions;
  deleted_at: Date | null;
  user_id: string | null;
  updated_at: Date;
  created_at: Date;
  id: string;
}

export interface ChatDetail {
  chat: Chat;
  messages: ChatMessage[];
}

export const enum ChatMessageRole {
  assistant = 'assistant',
  user = 'user'
}

export interface ChatMessage {
  id: number;
  role: ChatMessageRole;
  error: string | null;
  trace_url: string | null;
  finished_at: Date | null;
  user_id: string | null;
  created_at: Date;
  updated_at: Date;
  ordinal: number;
  content: string;
  sources: ChatMessageSource[];
  chat_id: string;
}

export interface ChatMessageSource {
  id: number;
  name: string;
  source_uri: string;
}

const chatSchema = z.object({
  title: z.string(),
  engine_id: z.number(),
  engine_options: z.string().transform(value => JSON.parse(value) as ChatEngineOptions),
  deleted_at: zodJsonDate().nullable(),
  user_id: z.string().nullable(),
  updated_at: zodJsonDate(),
  created_at: zodJsonDate(),
  id: z.string(),
});

const chatMessageSourceSchema = z.object({
  id: z.number(),
  name: z.string(),
  source_uri: z.string(),
});

const chatMessageSchema = z.object({
  id: z.number(),
  role: z.enum([ChatMessageRole.user, ChatMessageRole.assistant]),
  error: z.string().nullable(),
  trace_url: z.string().nullable(),
  finished_at: zodJsonDate().nullable(),
  user_id: z.string().nullable(),
  created_at: zodJsonDate(),
  updated_at: zodJsonDate(),
  ordinal: z.number(),
  content: z.string(),
  sources: chatMessageSourceSchema.array(),
  chat_id: z.string(),
});

const chatDetailSchema = z.object({
  chat: chatSchema,
  messages: chatMessageSchema.array(),
});

export interface FeedbackParams {
  feedback_type: 'like' | 'dislike';
  comment: string;
}

export interface PostChatParams {
  chat_id?: string;
  chat_engine?: string;
  content: string;

  headers?: HeadersInit;
  signal?: AbortSignal;
}

export async function listChats ({ page = 1, size = 10 }: PageParams = {}): Promise<Page<Chat>> {
  return await fetch(BASE_URL + '/api/v1/chats' + '?' + buildUrlParams({ page, size }), {
    headers: await opaqueCookieHeader(),
  })
    .then(handleResponse(zodPage(chatSchema)));
}

export async function getChat (id: string): Promise<ChatDetail> {
  return await fetch(BASE_URL + `/api/v1/chats/${id}`, {
    headers: await opaqueCookieHeader(),
  })
    .then(handleResponse(chatDetailSchema));
}

export async function deleteChat (id: string): Promise<void> {
  await fetch(BASE_URL + `/api/v1/chats/${id}`, {
    method: 'delete',
  }).then(handleErrors);
}

export async function postFeedback (chatMessageId: number, feedback: FeedbackParams) {
  return await fetch(BASE_URL + `/api/v1/chat-messages/${chatMessageId}/feedback`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedback),
  }).then(handleErrors);
}

export async function getChatMessageSubgraph (chatMessageId: number): Promise<KnowledgeGraph> {
  return await fetch(BASE_URL + `/api/v1/chat-messages/${chatMessageId}/subgraph`, {
    headers: await opaqueCookieHeader(),
  })
    .then(handleResponse(knowledgeGraphSchema));
}

export async function* chat ({ chat_id, chat_engine = 'default', content, headers: headersInit, signal }: PostChatParams, onResponse?: (response: Response) => void) {
  const headers = new Headers(headersInit);
  headers.set('Content-Type', 'application/json');

  const response = await fetch(BASE_URL + `/api/v1/chats`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      chat_id,
      chat_engine,
      stream: true,
      messages: [{
        'role': 'user',
        content,
      }],
    }),
    signal,
  }).then(handleErrors);

  onResponse?.(response);

  if (!response.body) {
    throw new Error(`${response.status} ${response.statusText} Empty response body`);
  }

  const decoder = new TextDecoder();
  const reader = response.body.getReader();

  while (true) {
    const chunk = await reader.read();
    if (chunk.done) {
      break;
    }

    const rawValue = decoder.decode(chunk.value, { stream: true });
    for (let line of rawValue.split('\n').filter(s => !!s.trim())) {
      yield parseStreamPart(line);
    }
  }
}
