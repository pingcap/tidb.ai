import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export interface App {
  app_id: string | null;
  name: string | null;
}

export interface AppAccessToken {
  app_id: string;
  token: string;
}

export interface AuthenticationProvider {
  config: Json;
  enabled: number;
  name: string;
}

export interface Chat {
  created_at: Date;
  created_by: string;
  deleted_at: Date | null;
  deleted_by: string | null;
  engine: string;
  engine_id: number | null;
  engine_name: string | null;
  engine_options: Json;
  id: Generated<number>;
  title: string;
  url_key: string;
}

export interface ChatEngine {
  deleted_at: Date | null;
  engine: string;
  engine_options: Json;
  id: Generated<number>;
  is_default: number;
  name: string;
}

export interface ChatMessage {
  chat_id: number;
  content: string;
  created_at: Date;
  delete_reason: "FORCE" | "REGENERATE" | null;
  deleted_at: Date | null;
  error_message: string | null;
  finished_at: Date | null;
  id: Generated<number>;
  options: Json;
  ordinal: number;
  role: string;
  status: "CREATED" | "FAILED" | "GENERATING" | "SUCCEED";
  trace_url: string | null;
}

export interface ChatMessageRetrieveRel {
  chat_message_id: number;
  info: Json;
  retrieve_id: number;
}

export interface Document {
  content_uri: string;
  created_at: Date;
  hash: string;
  id: Generated<number>;
  last_modified_at: Date;
  mime: string;
  name: string;
  source_uri: string;
}

export interface DocumentImportTask {
  created_at: Date;
  document_id: number | null;
  document_operation: "CREATE" | "UPDATE" | null;
  error_message: string | null;
  finished_at: Date | null;
  id: Generated<number>;
  parent_task_id: number | null;
  source_id: number | null;
  status: "CREATED" | "FAILED" | "IMPORTING" | "PENDING" | "SUCCEED";
  type: string;
  url: string;
}

export interface DocumentIndexTask {
  created_at: Generated<Date>;
  document_id: number;
  ended_at: Date | null;
  id: Generated<number>;
  index_id: number;
  info: Json;
  message: string | null;
  started_at: Date | null;
  status: "CANCELED" | "CREATED" | "FAILED" | "INDEXING" | "PENDING" | "SUCCEED";
  type: "CREATE_INDEX" | "REINDEX";
}

export interface Feedback {
  action: "dislike" | "like";
  chat_id: number;
  comment: string;
  created_at: Date;
  created_by: string;
  id: Generated<number>;
  knowledge_graph_detail: Json;
  knowledge_graph_report_error: string | null;
  knowledge_graph_reported_at: Date | null;
  message_id: number;
  trace_id: Buffer;
}

export interface Index {
  config: Json;
  configured: Generated<number>;
  created_at: Generated<Date>;
  id: number;
  last_modified_at: Generated<Date>;
  name: string;
}

export interface KnowledgeGraphFeedback {
  comment: string;
  created_at: Date;
  created_by: string;
  detail: Json;
  id: Generated<number>;
  report_error: string | null;
  reported_at: Date | null;
  trace_id: Buffer;
}

export interface LlamaindexDocumentChunkNodeDefault {
  document_id: number;
  embedding: unknown | null;
  hash: string;
  id: Buffer;
  index_id: number;
  metadata: Json;
  text: string;
}

export interface LlamaindexDocumentNode {
  document_id: number;
  hash: string;
  id: Buffer;
  index_id: number;
  index_info: Json;
  indexed_at: Date;
  metadata: Json;
  text: string;
}

export interface LlamaindexNodeRelationship {
  source_node_id: Buffer;
  target_node_id: Buffer;
  type: "CHILD" | "NEXT" | "PARENT" | "PREVIOUS" | "SOURCE";
}

export interface Option {
  group_name: string;
  option_name: string;
  option_type: "array" | "number" | "object" | "string";
  option_value: Json;
}

export interface Retrieve {
  created_at: Date;
  error_message: string | null;
  finished_at: Date | null;
  id: Generated<number>;
  index_id: number;
  options: Json;
  rerank_ended_at: Date | null;
  rerank_started_at: Date | null;
  search_ended_at: Date | null;
  search_started_at: Date | null;
  status: "CREATED" | "FAILED" | "RERANKING" | "SEARCHING" | "SUCCEED";
  text: string;
}

export interface RetrieveResult {
  chunk_metadata: Json;
  chunk_text: string;
  document_chunk_node_id: Buffer;
  document_id: number;
  document_metadata: Json | null;
  document_node_id: Buffer;
  id: Generated<number>;
  relevance_score: number;
  retrieve_id: number;
}

export interface Source {
  created_at: Date;
  id: Generated<number>;
  next_reschedule_at: Date | null;
  type: string;
  url: string;
}

export interface Status {
  created_at: Generated<Date>;
  last_modified_at: Generated<Date>;
  status_name: string;
  status_type: "array" | "date" | "number" | "object" | "string";
  status_value: Json;
}

export interface DB {
  app: App;
  app_access_token: AppAccessToken;
  authentication_provider: AuthenticationProvider;
  chat: Chat;
  chat_engine: ChatEngine;
  chat_message: ChatMessage;
  chat_message_retrieve_rel: ChatMessageRetrieveRel;
  document: Document;
  document_import_task: DocumentImportTask;
  document_index_task: DocumentIndexTask;
  feedback: Feedback;
  index: Index;
  knowledge_graph_feedback: KnowledgeGraphFeedback;
  llamaindex_document_chunk_node_default: LlamaindexDocumentChunkNodeDefault;
  llamaindex_document_node: LlamaindexDocumentNode;
  llamaindex_node_relationship: LlamaindexNodeRelationship;
  option: Option;
  retrieve: Retrieve;
  retrieve_result: RetrieveResult;
  source: Source;
  status: Status;
}
