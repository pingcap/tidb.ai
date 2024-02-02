import { rag } from '@/core/interface';
import { md5 } from '@/lib/digest';
import type { Root } from 'hast';
import { Options as HastUtilToText, toText } from 'hast-util-to-text';
import type { Root as MdastRoot } from 'mdast';
import rehypeDocument from 'rehype-document';
import remarkGfm from 'remark-gfm';
import remarkParse, { Options as RemarkParseOptions } from 'remark-parse';
import remarkRehype, { type Options as RemarkRehypeOptions } from 'remark-rehype';

import { Processor, unified } from 'unified';

export namespace MarkdownLoader {
  export interface Options {
    remarkParse?: RemarkParseOptions;
    remarkRehype?: RemarkRehypeOptions;
    toText?: HastUtilToText;
  }
}

export class MarkdownLoader extends rag.Loader<MarkdownLoader.Options, {}> {
  static identifier = 'rag.loader.markdown';
  static displayName = 'Markdown loader';

  private readonly processor: Processor<MdastRoot, MdastRoot, Root>;

  constructor (options: MarkdownLoader.Options) {
    super(options);

    this.processor = unified()
      .use(remarkParse, this.options.remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, this.options.remarkRehype)
      .use(rehypeDocument, {})
      .freeze();
  }

  async load (buffer: Buffer): Promise<rag.Content<{}>> {
    const mdast = this.processor.parse(buffer);

    const hast = await this.processor.run(mdast);

    const content = toText(hast, this.options.toText);

    return {
      content: [content],
      digest: md5(content),
      metadata: { },
    } satisfies rag.Content<{}>;
  }

  support (mime: string): boolean {
    return /markdown/.test(mime);
  }

}