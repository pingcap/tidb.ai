import { rag } from '@/core/interface';
import { md5 } from '@/lib/digest';
import type { Root } from 'hast';
import { toText } from 'hast-util-to-text';
import type { Root as MdastRoot } from 'mdast';
import rehypeDocument from 'rehype-document';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';

import { Processor, unified } from 'unified';
import markdownLoaderMeta, { type MarkdownLoaderOptions } from './meta';

export default class MarkdownLoader extends rag.Loader<MarkdownLoaderOptions, {}> {

  private readonly processor: Processor<MdastRoot, MdastRoot, Root>;

  constructor (options: MarkdownLoaderOptions) {
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
      metadata: {},
    } satisfies rag.Content<{}>;
  }

  support (mime: string): boolean {
    return /markdown/.test(mime);
  }
}

Object.assign(MarkdownLoader, markdownLoaderMeta);
