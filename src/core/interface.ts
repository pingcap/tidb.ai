import { Namespace } from '@/core/db/schema';
import type { AIStreamCallbacksAndOptions } from 'ai';
import type { FC } from 'react';
import { z, type ZodObject } from 'zod';

export namespace rag {
  export interface Content<ContentMetadata> {
    content: string[];
    digest: string;
    metadata: ContentMetadata;
  }

  export interface ContentChunk<ChunkMetadata> {
    content: string;
    metadata: ChunkMetadata;
  }

  export interface EmbeddedContentChunk<ChunkMetadata> extends ContentChunk<ChunkMetadata> {
    vector: Vector;
  }

  export interface ChunkedContent<ContentMetadata, ChunkMetadata> extends Content<ContentMetadata> {
    chunks: ContentChunk<ChunkMetadata>[];
  }

  export interface EmbeddedContent<ContentMetadata, ChunkMetadata> extends Content<ContentMetadata> {
    chunks: EmbeddedContentChunk<ChunkMetadata>[];
  }

  export type Vector = Float64Array;

  export interface ChatMessage {
    role: 'user' | 'assistant' | 'system'; // human, ai, system
    content: string;
  }

  export interface ChatMessageStream {
    role: 'user' | 'assistant' | 'system';
    content: AsyncIterable<string>;
  }

  export type BaseMeta<Options> = {
    identifier: string;
    displayName: string;
    optionsSchema: ZodObject<any, any, any, Options>;
    description?: FC;
  }

  export abstract class Base<Options> {
    static readonly identifier: string;
    static readonly displayName: string;
    static readonly optionsSchema = z.object({});
    static readonly description?: FC;

    readonly options: Options;

    constructor (options: Options) {
      this.options = options;
      this.postConstructor();
    }

    protected postConstructor () {}

    get identifier (): string {
      return (this.constructor as typeof Base).identifier;
    }

    get displayName (): string {
      return (this.constructor as typeof Base).displayName;
    }
  }

  export abstract class DocumentStorage<Options> extends Base<Options> {
    abstract available (): boolean;

    abstract put (path: string, stream: Body | Buffer, tmp?: boolean): Promise<string>;

    abstract get (path: string): Promise<Buffer>;

    abstract delete (path: string): Promise<boolean>;
  }

  export abstract class Loader<Options, ContentMetadata> extends Base<Options> {
    abstract support (mime: string, uri: string): boolean | Promise<boolean>;

    abstract load (buffer: Buffer, uri: string): Content<ContentMetadata> | Promise<Content<ContentMetadata>>;
  }

  export abstract class Splitter<Options, ContentMetadata, ChunkMetadata> extends Base<Options> {
    abstract support (content: Content<ContentMetadata>): boolean | Promise<boolean>;

    abstract split (content: Content<ContentMetadata>): ChunkedContent<ContentMetadata, ChunkMetadata> | Promise<ChunkedContent<ContentMetadata, ChunkMetadata>>;
  }

  export abstract class Embeddings<Options> extends Base<Options> {
    abstract embedChunks (chunks: string[]): Promise<Vector[]>;

    abstract embedQuery (query: string): Promise<Vector>;
  }

  export abstract class Reranker<Options> extends Base<Options> {
    abstract rerank (query: string, content: RetrievedContext[], top_n: number): Promise<{ results: RerankedContext[], metadata: Record<string, any> }>
  }

  export abstract class ChatModel<Options> extends Base<Options> {
    /**
     * @deprecated
     */
    abstract chat (history: ChatMessage[]): Promise<ChatMessage>

    abstract chatStream (history: ChatMessage[], callbacks?: AIStreamCallbacksAndOptions): Promise<ReadableStream>
  }

  export abstract class ContentMetadataExtractor<Options, Type = any> extends Base<Options> {
    abstract get metadataKey (): string;

    abstract extract (document: Content<any>): Promise<Type>
  }

  export abstract class ContentChunkMetadataExtractor<Options, Type = any> extends Base<Options> {
    abstract get metadataKey (): string;

    abstract extract (chunk: ContentChunk<any>): Promise<Type>
  }

  export type ImportSourceTaskResult = {
    enqueue?: Array<{ type: string, url: string }>
    content?: {
      buffer: Buffer
      mime: string
    }
  }

  export abstract class ImportSourceTaskProcessor<Options> extends Base<Options> {
    abstract support (taskType: string, url: string): boolean;

    abstract process (task: { url: string }): Promise<ImportSourceTaskResult>
  }

  export type Retriever = (query: string, top_k: number, namespace: string[]) => Promise<{ id: string, top: RetrievedContext[] }>;

  export type PromptingContext = {
    model: ChatModel<any>;
    retriever: Retriever;
    defaultNamespaces: string[];
    specifyNamespaces: string[];
    candidateNamespaces: Namespace[];
  }

  export interface RetrievedContext {
    text_content: string,
    source_uri: string,
    source_name: string,
  }

  export interface RerankedContext extends RetrievedContext {
    semantic_search_index: number;
    relevance_score: number;
  }

  export abstract class Prompting<Options> extends Base<Options> {
    abstract refine (ctx: PromptingContext, query: string): Promise<Prompting.RefinedMessages>
  }

  export namespace Prompting {
    export type RefinedMessages = ContextualMessages | NonContextualMessages;
    export type ContextualMessages = { queryId: string, messages: ChatMessage[], context: RetrievedContext[], metadata: Record<string, any> };
    export type NonContextualMessages = { messages: ChatMessage[], metadata: Record<string, any> }
  }

  /**
   * @deprecated
   */
  export interface RawContent {
    storage: string;
    uri: string;
    sourceUri: string;
    mime?: string;
  }

  /**
   * @deprecated
   */
  export interface IUriLoader {

    support (uri: string): boolean;

    load (uri: string): Promise<RawContent[]>;
  }
}
