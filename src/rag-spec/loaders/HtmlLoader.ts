import { rag } from '@/core/interface';
import { md5 } from '@/lib/digest';
import type { Element, Root } from 'hast';
import { select } from 'hast-util-select';
import { toText } from 'hast-util-to-text';
import matchUrl from 'match-url-wildcard';
import { isMatch } from 'micromatch';
import rehypeParse, { Options as RehypeParseOptions } from 'rehype-parse';
import { Processor, unified } from 'unified';
import { z } from 'zod';

export class HtmlLoader extends rag.Loader<HtmlLoader.Options, {}> {
  static identifier = 'rag.loader.html';
  static displayName = 'HTML loader';

  private readonly processor: Processor<Root>;

  constructor (options: HtmlLoader.Options) {
    super(options);

    this.processor = unified()
      .use(rehypeParse, this.options.rehypeParse)
      .freeze();
  }

  load (buffer: Buffer, url: string): rag.Content<{}> {
    const { result, warning } = this.process(url, buffer);

    const content = result.map(item => item.content).join('\n\n');

    return {
      content: content,
      digest: md5(content),
      metadata: {
        partitions: result.map(item => ({
          selector: item.selector,
          position: item.element.position,
        })),
        warning: warning.length ? warning : undefined,
      },
    } satisfies rag.Content<{}>;
  }

  support (mime: string): boolean {
    return /html/.test(mime);
  }

  private getPathname (url: string) {
    try {
      return new URL(url).pathname;
    } catch {
      return url;
    }
  }

  private process (url: string, buffer: Buffer) {
    const pathname = this.getPathname(url);

    const selectors: string[] = [];

    for (let [domain, rules] of Object.entries(this.options.contentExtraction ?? {})) {
      if (matchUrl(url, domain)) {
        for (let rule of rules) {
          if (isMatch(pathname, rule.pattern)) {
            selectors.push(rule.contentSelector);
          }
        }
      }
    }

    const failed: string[] = [];
    const warning: string[] = [];

    if (!selectors.length) {
      selectors.push('body');
      warning.push('No selector provided for this URL. the default selector `body` always contains redundancy content.');
    }

    const root = this.processor.parse(Uint8Array.from(buffer));

    const result: { content: string, selector: string, element: Element }[] = [];
    for (let selector of selectors) {
      const element = select(selector, root);
      if (element) {
        result.push({
          content: toText(element), selector, element,
        });
      } else {
        failed.push(selector);
      }
    }

    if (failed.length > 0) {
      warning.push(`Select element failed for selector(s): ${failed.map(selector => `\`${selector}\``).join(', ')}`);
    }

    return { result, failed, warning };
  }
}

export namespace HtmlLoader {
  const contentExtractionConfigSchema = z.record(z.object({
    pattern: z.string(),
    contentSelector: z.string(),
  }).array());

  export interface Options {
    rehypeParse?: RehypeParseOptions;
    contentExtraction?: z.infer<typeof contentExtractionConfigSchema>;
  }

  export const optionsSchema = z.object({
    rehypeParse: z.object({}).passthrough().optional(),
    contentExtraction: contentExtractionConfigSchema.optional(),
  });
}
