import { rag } from '@/core/interface';
import { md5 } from '@/lib/digest';
import type { Root } from 'hast';
import { toText } from 'hast-util-to-text';
import rehypeParse, { Options as RehypeParseOptions } from 'rehype-parse';
import { Processor, unified } from 'unified';
import { z } from 'zod';

export class HtmlLoader extends rag.Loader<HtmlLoader.Options, {}> {
  static identifier = 'rag.loader.html';
  static displayName = 'HTML loader';

  private readonly processor: Processor<Root>;

  constructor (options: HtmlLoader.Options) {
    super(options);

    this.processor = unified().use(rehypeParse, this.options.rehypeParse).freeze();
  }

  async load (buffer: Buffer): Promise<rag.Content<{}>> {
    const hast = this.processor.parse(Uint8Array.from(buffer));

    const content = toText(hast);

    return {
      content: content,
      digest: md5(content),
      metadata: { loader: this.identifier },
    } satisfies rag.Content<{}>;
  }

  support (mime: string): boolean {
    return /html/.test(mime);
  }

  static readonly optionsSchema = z.object({
    rehypeParse: z.object({}).passthrough().optional(),
  });
}

export namespace HtmlLoader {
  export interface Options {
    rehypeParse?: RehypeParseOptions;
  }
}