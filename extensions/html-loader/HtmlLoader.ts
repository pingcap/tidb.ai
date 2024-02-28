import { rag } from '@/core/interface';
import { md5 } from '@/lib/digest';
import { createUrlMatcher } from '@/lib/url-matcher';
import { type HtmlSelectorItemType } from '@/lib/zod-extensions/types/html-selector-array';
import type { Element, Root } from 'hast';
import { select, selectAll } from 'hast-util-select';
import { toText } from 'hast-util-to-text';
import rehypeParse from 'rehype-parse';
import { Processor, unified } from 'unified';
import { remove } from 'unist-util-remove';
import htmlLoaderMeta, { type HtmlLoaderOptions } from './meta';

export default class HtmlLoader extends rag.Loader<HtmlLoaderOptions, {}> {
  private readonly processor: Processor<Root>;

  constructor (options: HtmlLoaderOptions) {
    super(options);

    this.processor = unified()
      .use(rehypeParse)
      .freeze();
  }

  load (buffer: Buffer, url: string): rag.Content<{}> {
    const { result, warning } = this.process(url, buffer);

    const content = result.map(item => item.content);

    return {
      content: content,
      digest: md5(content.join('\n\n\n\n')),
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

  private process (url: string, buffer: Buffer) {
    const excludeSelectors: HtmlSelectorItemType[] = [];
    const selectors: HtmlSelectorItemType[] = [];

    for (let rule of (this.options.contentExtraction ?? [])) {
      const matcher = createUrlMatcher(rule.url);
      if (matcher(url)) {
        for (let selector of rule.selectors) {
          selectors.push(selector);
        }
        for (let excludeSelector of rule.excludeSelectors) {
          excludeSelectors.push(excludeSelector);
        }
      }
    }

    const failed: string[] = [];
    const warning: string[] = [];

    if (!selectors.length || !selectors.find(s => s.type == undefined || s.type == 'dom-text')) {
      selectors.push({ selector: 'body', all: false, type: 'dom-text' });
      warning.push('No content selector provided for this URL. the default selector `body` always contains redundancy content.');
    }

    if (!excludeSelectors.length) {
      excludeSelectors.push({
        selector: 'script',
        type: 'dom-text',
        all: true,
      });
    }

    const root = this.processor.parse(Uint8Array.from(buffer));

    const excludedNodes = excludeSelectors.reduce((set, item) => {
      if (item.all) {
        selectAll(item.selector, root).forEach(node => set.add(node));
      } else {
        const node = select(item.selector, root);
        if (node) set.add(node);
      }
      return set;
    }, new Set<any>());

    remove(root, (node) => excludedNodes.has(node) || node.type === 'comment');

    const result: { content: string, selector: string, element: Element }[] = [];
    for (let { selector, all: multiple, type } of selectors) {
      if (multiple) {
        const elements = selectAll(selector, root);
        if (elements.length > 0) {
          result.push(...elements.map(element => ({
            content: getContent(element, type), selector, element,
          })));
        } else {
          failed.push(selector);
        }
      } else {
        const element = select(selector, root);
        if (element) {
          result.push({
            content: getContent(element, type), selector, element,
          });
        } else {
          failed.push(selector);
        }
      }
    }

    if (failed.length > 0) {
      warning.push(`Select element failed for selector(s): ${failed.map(selector => `\`${selector}\``).join(', ')}`);
    }

    return { result, failed, warning };
  }
}

Object.assign(HtmlLoader, htmlLoaderMeta);

function getContent (element: Element, type: HtmlSelectorItemType['type']) {
  if (type === 'dom-content-attr') {
    return String(element.properties['content'] ?? '');
  } else {
    return toText(element);
  }
}
