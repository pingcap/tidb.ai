import { Namespace } from '@/core/db/schema';
import type { AIStreamCallbacksAndOptions } from 'ai';
import type { FC } from 'react';
import { z, type ZodObject } from 'zod';

export namespace rag {
  export interface Content<ContentMetadata> {
    content: string[];
    hash: string;
    metadata: ContentMetadata;
  }

  export interface ContentChunk<ChunkMetadata> {
    content: string;
    hash: string;
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

  export enum ExtensionType {
    DocumentStorage = 'rag.document-storage',
    Loader = 'rag.loader',
    Embeddings = 'rag.embeddings',
    Reranker = 'rag.reranker',
    ChatModel = 'rag.chat-model',
    ContentMetadataExtractor = 'rag.content-metadata-extractor',
    ContentChunkMetadataExtractor = 'rag.content-chunk-metadata-extractor',
    ImportSourceTaskProcessor = 'rag.import-source-task',
    /**
     * @deprecated
     */
    Prompting = 'rag.prompting',
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
    static readonly type: ExtensionType;

    readonly options: Options;
    readonly type: ExtensionType;

    constructor (options: Options) {
      this.options = options;
      this.postConstructor();
      this.type = (this.constructor as any).type;
    }

    protected postConstructor () {}

    get identifier (): string {
      return (this.constructor as typeof Base).identifier;
    }

    get displayName (): string {
      return (this.constructor as typeof Base).displayName;
    }

    withOptions (options: Options): this {

      return new (this.constructor as any)((this.constructor as any).optionsSchema.parse(options));
    }
  }

  export abstract class DocumentStorage<Options> extends Base<Options> {
    static type = ExtensionType.DocumentStorage;

    abstract available (): boolean;

    abstract put (path: string, stream: Body | Buffer, tmp?: boolean): Promise<string>;

    abstract get (path: string): Promise<Buffer>;

    abstract delete (path: string): Promise<boolean>;
  }

  export abstract class Loader<Options, ContentMetadata> extends Base<Options> {
    static type = ExtensionType.Loader;

    abstract support (mime: string, uri: string): boolean;

    abstract load (buffer: Buffer, uri: string): Content<ContentMetadata> | Promise<Content<ContentMetadata>>;
  }

  export abstract class Embeddings<Options> extends Base<Options> {
    static type = ExtensionType.Embeddings;

    abstract embedChunks (chunks: string[]): Promise<Vector[]>;

    abstract embedQuery (query: string): Promise<Vector>;
  }

  export abstract class Reranker<Options> extends Base<Options> {
    static type = ExtensionType.Reranker;

    abstract rerank (query: string, content: RetrievedContext[], top_n: number): Promise<{ results: RerankedContext[], metadata: Record<string, any> }>
  }

  export abstract class ChatModel<Options> extends Base<Options> {
    static type = ExtensionType.ChatModel;

    /**
     * @deprecated
     */
    abstract chat (history: ChatMessage[]): Promise<ChatMessage>

    abstract chatStream (history: ChatMessage[], callbacks?: AIStreamCallbacksAndOptions): Promise<ReadableStream>
  }

  export abstract class ContentMetadataExtractor<Options, Type = any> extends Base<Options> {
    static type = ExtensionType.ContentMetadataExtractor;

    abstract get metadataKey (): string;

    abstract extract (document: Content<any>): Promise<Type>
  }

  export abstract class ContentChunkMetadataExtractor<Options, Type = any> extends Base<Options> {
    static type = ExtensionType.ContentChunkMetadataExtractor;

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
    static type = ExtensionType.ImportSourceTaskProcessor;

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

  /**
   * @deprecated
   */
  export abstract class Prompting<Options> extends Base<Options> {
    static type = ExtensionType.Prompting;

    /**
     * @deprecated
     */
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

  const extensionTypesMap = {
    [rag.ExtensionType.DocumentStorage]: DocumentStorage,
    [rag.ExtensionType.ChatModel]: ChatModel,
    [rag.ExtensionType.ContentChunkMetadataExtractor]: ContentChunkMetadataExtractor,
    [rag.ExtensionType.ContentMetadataExtractor]: ContentMetadataExtractor,
    [rag.ExtensionType.Loader]: Loader,
    [rag.ExtensionType.ImportSourceTaskProcessor]: ImportSourceTaskProcessor,
    [rag.ExtensionType.Embeddings]: Embeddings,
    [rag.ExtensionType.Prompting]: Prompting,
    [rag.ExtensionType.Reranker]: Reranker,
  } as const;

  export type ExtensionTypesMap = typeof extensionTypesMap;
}

export namespace rag {
  export function addChunks<M, N> (content: Content<M>, chunks: EmbeddedContentChunk<N>[]): EmbeddedContent<M, N>
  export function addChunks<M, N> (content: Content<M>, chunks: ContentChunk<N>[]): ChunkedContent<M, N> {
    return {
      ...content,
      chunks,
    };
  }
}
