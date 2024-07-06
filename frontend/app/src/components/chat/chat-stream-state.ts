/**
 *  TRACE = 0
 *     SOURCE_NODES = 1
 *     KG_RETRIEVAL = 2
 *     REFINE_QUESTION = 3
 *     SEARCH_RELATED_DOCUMENTS = 4
 *     GENERATE_ANSWER = 5
 *     FINISHED = 9
 */
import type { ChatMessageSource } from '@/api/chats';

export const enum AppChatStreamState {
  CONNECTING = 'CONNECTING', // only client side
  TRACE = 'TRACE',
  SOURCE_NODES = 'SOURCE_NODES',
  KG_RETRIEVAL = 'KG_RETRIEVAL',
  REFINE_QUESTION = 'REFINE_QUESTION',
  SEARCH_RELATED_DOCUMENTS = 'SEARCH_RELATED_DOCUMENTS',
  RERANKING = 'RERANKING',
  GENERATE_ANSWER = 'GENERATE_ANSWER',
  FINISHED = 'FINISHED',
}

export interface BaseAnnotation<S extends AppChatStreamState> {
  state: S;
  display: string;
  chat_id: string;
  message_id: number;
}

export interface TraceAnnotation extends BaseAnnotation<AppChatStreamState.TRACE> {
  context: { langfuse_url: string };
}

export interface SourceNodesAnnotation extends BaseAnnotation<AppChatStreamState.SOURCE_NODES> {
  context: ChatMessageSource[];
}

export type ChatMessageAnnotation =
  BaseAnnotation<Exclude<AppChatStreamState, AppChatStreamState.TRACE | AppChatStreamState.SOURCE_NODES>>
  | TraceAnnotation
  | SourceNodesAnnotation;
