import {rag} from '@/core/interface';
import {md5} from '@/lib/digest';
import {createUrlMatcher} from '@/lib/url-matcher';
import {HtmlSelectorItemType} from "@/lib/zod-extensions/types/html-selector-array";
import type {Element, Root} from 'hast';
import {select, selectAll} from 'hast-util-select';
import {toText} from 'hast-util-to-text';
import {match} from 'path-to-regexp';
import rehypeParse from 'rehype-parse';
import {Processor, unified} from 'unified';
import {remove} from 'unist-util-remove';
import htmlLoaderMeta, {
  DEFAULT_EXCLUDE_SELECTORS,
  DEFAULT_TEXT_SELECTORS,
  ExtractedMetadata,
  HtmlLoaderOptions,
  MetadataExtractor,
  MetadataExtractorType,
  URLMetadataExtractor
} from './meta';

export default class HtmlLoader extends rag.Loader<HtmlLoaderOptions, {}> {
  private readonly unifiedProcessor: Processor<Root>;

  constructor(options: HtmlLoaderOptions) {
    super({
      contentExtraction: options.contentExtraction ?? [],
      metadataExtraction: options.metadataExtraction ?? [],
    });
    this.unifiedProcessor = unified()
      .use(rehypeParse)
      .freeze();
  }

  load (buffer: Buffer, url: string): rag.Content<{}> {
    const matchedTexts = this.extractTextsFromDocument(url, buffer);
    const metadataFromURL = this.extractMetadataFromURL(url);

    return {
      content: matchedTexts,
      hash: this.getTextHash(matchedTexts),
      metadata: {
        documentUrl: url,
        documentMetadata: {
          ...metadataFromURL
        }
      },
    } satisfies rag.Content<{}>;
  }

  support (mime: string): boolean {
    return /html/.test(mime);
  }

  private getTextHash (texts: string[]) {
    return md5(texts.join('\n\n\n\n'));
  }

  /**
   * Extract texts from the HTML document.
   * @param url The URL of the document.
   * @param buffer The content buffer of the document.
   * @private
   */
  private extractTextsFromDocument (url: string, buffer: Buffer) {
    const { selectors, excludeSelectors } = this.getMatchedTextSelectors(url);
    const documentRoot = this.unifiedProcessor.parse(Uint8Array.from(buffer));

    // Remove excluded nodes.
    const excludedNodes = new Set<any>(this.selectElements(documentRoot, excludeSelectors));
    remove(documentRoot, (node) => excludedNodes.has(node) || node.type === 'comment');

    // Select text from matched elements.
    return this.selectElementTexts(documentRoot, selectors);
  }

  private getMatchedTextSelectors (url: string) {
    const excludeSelectors: HtmlSelectorItemType[] = [];
    const selectors: HtmlSelectorItemType[] = [];

    for (let rule of (this.options.contentExtraction ?? [])) {
      const matcher = createUrlMatcher(rule.url);
      if (matcher(url)) {
        selectors.push(...rule.selectors);
        excludeSelectors.push(...rule.excludeSelectors);
      }
    }

    if (!selectors.length || !this.hasTextSelector(selectors)) {
      console.warn('No text selector provided, fallback to using default selector, which may contains redundancy content.', {
        defaultSelectors: DEFAULT_TEXT_SELECTORS,
      });
      selectors.push(...DEFAULT_TEXT_SELECTORS);
    }

    if (!excludeSelectors.length) {
      excludeSelectors.push(...DEFAULT_EXCLUDE_SELECTORS);
    }

    return { selectors, excludeSelectors };
  }

  private hasTextSelector (selectors: HtmlSelectorItemType[]) {
    // TODO: confirm the type.
    return selectors.find(s => s.type == undefined || s.type == 'dom-text')
  }

  private selectElements (root: Root, selectorItems: HtmlSelectorItemType[]){
    const matchedElements: Element[] = [];

    for (let { selector, all } of selectorItems) {
      if (all) {
        const elements = selectAll(selector, root);
        if (elements.length > 0) {
          matchedElements.push(...elements);
        }
      } else {
        const element = select(selector, root);
        if (element) {
          matchedElements.push(element);
        }
      }
    }

    return matchedElements;
  }

  private selectElementTexts (root: Root, selectorItems: HtmlSelectorItemType[]){
    const matchedTexts: string[] = [];

    for (let { selector, all, type } of selectorItems) {
      if (all) {
        const elements = selectAll(selector, root);
        if (elements.length > 0) {
          matchedTexts.push(...elements.map(element => this.getElementTextContent(element, type)));
        } else {
          console.warn(`Selector \`${selector}\` matched no elements.`)
        }
      } else {
        const element = select(selector, root);
        if (element) {
          matchedTexts.push(this.getElementTextContent(element, type));
        } else {
          console.warn(`Selector \`${selector}\` matched no elements.`)
        }
      }
    }

    return matchedTexts;
  }

  private getElementTextContent (element: Element, type: HtmlSelectorItemType['type']) {
    if (type === 'dom-content-attr') {
      return String(element.properties['content'] ?? '');
    } else {
      return toText(element);
    }
  }

  /**
   * Extract metadata from the URL.
   * @param url The URL of the document.
   * @private
   */
  private extractMetadataFromURL (url: string): Record<string, any> {
    const extractors = this.getMatchedMetadataExecutors(url);
    const metadata: ExtractedMetadata = {};

    for (let extractor of extractors) {
      if (extractor.type === MetadataExtractorType.URL_METADATA_EXTRACTOR) {
        const urlMetadataExtractor = extractor as unknown as URLMetadataExtractor;
        const urlMatch = match(urlMetadataExtractor.urlMetadataPattern, {
          decode: decodeURIComponent,
        });

        const urlObj = new URL(url);
        const matchedMetadata = urlMatch(urlObj.pathname);

        if (matchedMetadata) {
          const params = this.excludeNonNamedParams(matchedMetadata.params);
          Object.assign(metadata, urlMetadataExtractor.defaultMetadata, params);
        }
      }
    }

    return metadata;
  }

  private getMatchedMetadataExecutors (url: string) {
    const rules: MetadataExtractor[] = [];

    for (let rule of (this.options.metadataExtraction ?? [])) {
      const matcher = createUrlMatcher(rule.urlPattern);
      if (matcher(url)) {
        rules.push(...rule.extractors);
      }
    }

    return rules;
  }

  private excludeNonNamedParams (source: Record<string, any>) {
    const target: Record<string, any> = {};
    for (let [key, val] of Object.entries(source)) {
      if (Number.isNaN(Number(key))) {
        target[key] = val;
      }
    }
    return target;
  }

}

Object.assign(HtmlLoader, htmlLoaderMeta);