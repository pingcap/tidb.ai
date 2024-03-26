import { rag } from '@/core/interface';
import { md5 } from '@/lib/digest';
import { Document as LangChainDocument } from '@langchain/core/documents';

import { RecursiveCharacterTextSplitter as LangChainRecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import recursiveCharacterTextSplitterMeta, { type RecursiveCharacterTextSplitterOptions } from './meta';

export default class RecursiveCharacterTextSplitter<ContentMetadata> extends rag.Splitter<RecursiveCharacterTextSplitterOptions, ContentMetadata, RecursiveCharacterTextSplitter.Metadata> {

  private readonly agent: LangChainRecursiveCharacterTextSplitter;

  constructor (options: RecursiveCharacterTextSplitterOptions) {
    super(options);
    this.agent = new LangChainRecursiveCharacterTextSplitter(options);
  }

  async split (content: rag.Content<ContentMetadata>): Promise<rag.ChunkedContent<ContentMetadata, RecursiveCharacterTextSplitter.Metadata>> {
    const results = await this.agent.splitDocuments(content.content.map(content => new LangChainDocument({ pageContent: content })));

    return {
      ...content,
      chunks: results.map(chunk => ({
        content: chunk.pageContent,
        hash: md5(chunk.pageContent),
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

Object.assign(RecursiveCharacterTextSplitter, recursiveCharacterTextSplitterMeta);

export namespace RecursiveCharacterTextSplitter {
  export interface Metadata {
    loc: {
      lines: {
        from: number
        to: number
      }
    };
  }
}