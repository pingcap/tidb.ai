import { rag } from '@/core/interface';
import { Document as LangChainDocument } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter as LangChainRecursiveCharacterTextSplitter, type RecursiveCharacterTextSplitterParams } from 'langchain/text_splitter';
import { z } from 'zod';

export namespace RecursiveCharacterTextSplitter {
  export interface Options extends Partial<RecursiveCharacterTextSplitterParams> {
  }

  export interface Metadata {
    loc: {
      lines: {
        from: number
        to: number
      }
    };
  }
}

export class RecursiveCharacterTextSplitter<ContentMetadata> extends rag.Splitter<RecursiveCharacterTextSplitter.Options, ContentMetadata, RecursiveCharacterTextSplitter.Metadata> {
  static identifier = 'rag.splitter.langchain.recursive-character';
  static displayName = 'Recursive Character Text Splitter';
  static optionsSchema = z.object({
    separators: z.string().array().optional(),
    chunkSize: z.number().int().optional(),
    chunkOverlap: z.number().int().optional(),
    keepSeparator: z.boolean().optional(),
  });

  private readonly agent: LangChainRecursiveCharacterTextSplitter;

  constructor (options: RecursiveCharacterTextSplitter.Options) {
    super(options);
    this.agent = new LangChainRecursiveCharacterTextSplitter(options);
  }

  async split (content: rag.Content<ContentMetadata>): Promise<rag.ChunkedContent<ContentMetadata, RecursiveCharacterTextSplitter.Metadata>> {
    const results = await this.agent.splitDocuments(content.content.map(content => new LangChainDocument({ pageContent: content })));

    return {
      ...content,
      chunks: results.map(chunk => ({
        content: chunk.pageContent,
        metadata: {
          ...chunk.metadata,
        } as never,
      })),
    };
  }

  support (content: rag.Content<ContentMetadata>): boolean | Promise<boolean> {
    return true;
  }

}
