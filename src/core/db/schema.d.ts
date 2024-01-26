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

export interface Chat {
  created_at: string;
  created_by: string;
  id: string;
  index_name: string;
  last_seen_at: Date | null;
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
  role: "ai" | "assistant" | "user";
}

export interface ChatMessageContextDocuments {
  chat_message_id: string;
  document_id: string;
  ordinal: number;
  text_content: string;
}

export interface Document {
  content_uri: string;
  created_at: Date;
  digest: string;
  id: string;
  last_modified_at: Date;
  mime: string;
  name: string;
  source_uri: string;
}

export interface DocumentIndex {
  created_at: Date;
  document_id: string;
  index_name: string;
  metadata: Json;
  status: "fail" | "indexing" | "ok";
  text_content: string;
  trace: string | null;
}

export interface DocumentIndexChunk {
  document_id: string;
  embedding: Json;
  id: string;
  index_name: string;
  metadata: Json;
  staled: number | null;
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
  document_id: string | null;
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
  created_at: Date;
  last_modified_at: Date;
  llm: string;
  llm_model: string;
  name: string;
  splitter_options: Json;
  splitter_type: string;
}

export interface IndexQuery {
  created_at: Date;
  embedding: Json | null;
  finished_at: Date | null;
  id: string;
  index_name: string;
  text: string;
}

export interface IndexQueryResult {
  document_index_chunk_id: string;
  index_query_id: string;
  score: number;
}

export interface VDocumentIndexStatus {
  document_id: string;
  index_name: string | null;
  index_state: Generated<string>;
  mime: Generated<string>;
}

export interface DB {
  chat: Chat;
  chat_message: ChatMessage;
  chat_message_context_documents: ChatMessageContextDocuments;
  document: Document;
  document_index: DocumentIndex;
  document_index_chunk: DocumentIndexChunk;
  import_source: ImportSource;
  import_source_task: ImportSourceTask;
  index: Index;
  index_query: IndexQuery;
  index_query_result: IndexQueryResult;
  v_document_index_status: VDocumentIndexStatus;
}
