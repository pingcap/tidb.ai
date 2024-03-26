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

export interface AuthenticationProviders {
  config: Json;
  enabled: number;
  name: string;
}

export interface Chat {
  created_at: Date;
  created_by: string;
  deleted_at: Date | null;
  deleted_by: string | null;
  id: string;
  index_name: string;
  llm: string;
  llm_model: string;
  name: string;
}

export interface ChatMessage {
  chat_id: string;
  content: string;
  created_at: Date;
  finished_at: Date | null;
  id: string;
  index_query_id: string | null;
  ordinal: number;
  role: "assistant" | "system" | "user";
}

export interface Document {
  content: string;
  content_uri: string;
  created_at: Date;
  digest: string;
  id: Buffer;
  last_modified_at: Date;
  mime: string;
  name: string;
  source_uri: string;
}

export interface DocumentIndex {
  created_at: Date;
  document_id: Buffer;
  index_name: string;
  metadata: Json;
  status: "fail" | "indexing" | "ok";
  text_content: string;
  trace: string | null;
}

export interface DocumentIndexChunk {
  document_id: Buffer;
  embedding: unknown;
  id: Buffer;
  index_name: string;
  metadata: Json;
  ordinal: number;
  staled: number;
  text_content: string;
}

export interface DocumentIndexChunkPartitioned {
  chunk_id: Buffer;
  document_id: Buffer;
  embedding: unknown;
  index_name: string;
  metadata: Json;
  namespace_id: number;
  ordinal: number;
  staled: number;
  text_content: string;
}

export interface ImportSource {
  created_at: Date;
  filter: string | null;
  filter_runtime: string | null;
  id: string;
  type: string;
  url: string;
}

export interface ImportSourceTask {
  created_at: Date;
  document_id: Buffer | null;
  error: string | null;
  finished_at: Date | null;
  id: Generated<number>;
  import_source_id: string;
  parent_task_id: number | null;
  status: "failed" | "pending" | "processing" | "succeed";
  type: string;
  url: string;
}

export interface Index {
  config: Json;
  created_at: Date;
  embedding: Generated<string>;
  last_modified_at: Date;
  llm: string;
  name: string;
  reranker: Generated<string>;
}

export interface IndexQuery {
  created_at: Date;
  embedding: unknown;
  finished_at: Date | null;
  id: string;
  index_name: string;
  metadata: Json | null;
  reranked_at: Date | null;
  reranker: string | null;
  text: string;
}

export interface IndexQueryResult {
  document_index_chunk_id: Buffer;
  index_query_id: string;
  relevance_score: number | null;
  score: number;
}

export interface Namespace {
  common: Generated<number>;
  common_uri_prefix: string | null;
  default: Generated<number>;
  description: string | null;
  id: Generated<number>;
  level: Generated<number>;
  name: string;
  parent_id: number | null;
}

export interface Option {
  group_name: string | null;
  option_name: string;
  option_type: "array" | "number" | "object" | "string";
  option_value: Json | null;
}

export interface Status {
  status_name: string;
  status_type: "array" | "date" | "number" | "object" | "string";
  status_value: Json | null;
}

export interface VDocumentIndexStatus {
  document_id: Buffer | null;
  index_name: string | null;
  index_state: string | null;
  indexed_at: Date | null;
  mime: string | null;
}

export interface DB {
  authentication_providers: AuthenticationProviders;
  chat: Chat;
  chat_message: ChatMessage;
  document: Document;
  document_index: DocumentIndex;
  document_index_chunk: DocumentIndexChunk;
  document_index_chunk_partitioned: DocumentIndexChunkPartitioned;
  import_source: ImportSource;
  import_source_task: ImportSourceTask;
  index: Index;
  index_query: IndexQuery;
  index_query_result: IndexQueryResult;
  namespace: Namespace;
  option: Option;
  status: Status;
  v_document_index_status: VDocumentIndexStatus;
}
