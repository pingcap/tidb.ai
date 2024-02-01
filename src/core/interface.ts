import type { DB } from '@/core/db/schema';
import type { TaskResult } from '@/core/db/task';
import type { AIStreamCallbacksAndOptions } from 'ai';
import type { Insertable, Selectable } from 'kysely';
import { z } from 'zod';

export namespace rag {
  export interface Content<ContentMetadata> {
    content: string;
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

  export abstract class Base<Options> {
    static readonly identifier: string;
    static readonly displayName: string;
    static readonly optionsSchema = z.object({});

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

  export abstract class ChatModel<Options> extends Base<Options> {
    /**
     * @deprecated
     */
    abstract chat (history: ChatMessage[]): Promise<ChatMessage>

    abstract chatStream (history: ChatMessage[], callbacks?: AIStreamCallbacksAndOptions): Promise<ReadableStream>
  }

  export abstract class ImportSourceResolver<Options> extends Base<Options> {
    abstract createTasks (source: Selectable<DB['import_source']>): Promise<Insertable<DB['import_source_task']>[]>
  }

  export abstract class ImportSourceTaskProcessor<Options> extends Base<Options> {
    abstract support (taskType: string, url: string): boolean;

    abstract process (task: Selectable<DB['import_source_task']>): Promise<TaskResult>
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
