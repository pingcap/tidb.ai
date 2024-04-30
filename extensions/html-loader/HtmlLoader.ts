import {rag} from '@/core/interface';
import {md5} from '@/lib/digest';
import {createUrlMatcher} from '@/lib/url-matcher';
import {ExtractValueMethod, HTMLExtractor} from "@/lib/zod-extensions/types/html-extractor-array";
import {HTMLSelector} from "@/lib/zod-extensions/types/html-selector-array";
import {CheerioAPI} from "cheerio";
import * as cheerio from 'cheerio';
import {Root} from "hast";
import {match} from 'path-to-regexp';
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkGfm from "remark-gfm";
import remarkStringify from 'remark-stringify';
import {Processor, unified} from "unified";
import htmlLoaderMeta, {
  DEFAULT_EXCLUDE_SELECTORS, DEFAULT_METADATA_EXTRACTOR,
  DEFAULT_TEXT_SELECTORS,
  ExtractedMetadata,
  type HtmlLoaderOptions, HTMLMetadataExtractor,
  MetadataExtractor,
  MetadataExtractorType, URLMetadataExtractor,
} from './meta';

export default class HtmlLoader extends rag.Loader<HtmlLoaderOptions, {}> {
  private readonly unifiedParser: Processor<Root, Root, any, any, string>;

  constructor(options: HtmlLoaderOptions) {
    super({
      contentExtraction: options.contentExtraction ?? [],
      metadataExtraction: options.metadataExtraction ?? [],
    });
    this.unifiedParser = unified()
      .use(rehypeParse) // Parse HTML to a syntax tree
      .use(remarkGfm) // Enable GitHub Flavored Markdown
      .use(rehypeRemark) // Turn HTML syntax tree to markdown syntax tree
      .use(remarkStringify) // Serialize HTML syntax tree
  }

  load (buffer: Buffer, url: string): rag.Content<{}> {
    const content = this.extractContent(url, buffer);
    const metadata = this.extractMetadata(url, buffer);

    return {
      content: content,
      hash: this.getTextHash(content),
      metadata: {
        url,
        ...metadata,
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
  private extractContent (url: string, buffer: Buffer) {
    const { selectors = [], excludeSelectors = [] } = this.getMatchedContentSelectors(url);
    const $ = cheerio.load(buffer);

    // Remove excluded nodes.
    for (const excludeSelector of excludeSelectors) {
      $(excludeSelector.selector).remove();
    }

    const contents = [];
    for (const extractor of selectors) {
      const texts = this.extractValuesFromHTML($, extractor);
      if (Array.isArray(texts)) {
        contents.push(...texts);
      } else {
        contents.push(texts);
      }
    }

    return contents;
  }

  private extractValuesFromHTML($: CheerioAPI, extractor: HTMLExtractor): string[] | string {
    const elements = extractor.all ? $(extractor.selector) : $(extractor.selector).first();

    if (extractor.extract === ExtractValueMethod.MARKDOWN) {
      const markdowns: string[] = [];
      $(elements).each((_, element) => {
        markdowns.push(String(this.unifiedParser.processSync($(element).html()!)));
      });
      return markdowns;
    }

    const values = elements.map( (_, element) => {
      switch (extractor.extract) {
        case ExtractValueMethod.ATTR:
          return $(element).prop(extractor.attr!);
        case ExtractValueMethod.PROP:
          return $(element).prop(extractor.prop!);
        default:
          // default: ExtractValueMethod.TEXT
          return $(element).text();
      }
    });

    return extractor.all ? values.get() : values.get(0)!;
  }

  private getMatchedContentSelectors (url: string) {
    const selectors: HTMLExtractor[] = [];
    const excludeSelectors: HTMLSelector[] = [];
    const rules = this.options.contentExtraction ?? [];

    for (let rule of rules) {
      const matcher = createUrlMatcher(rule.url);
      if (matcher(url)) {
        selectors.push(...rule.selectors);
        excludeSelectors.push(...rule.excludeSelectors);
      }
    }

    if (selectors.length === 0) {
      selectors.push(...DEFAULT_TEXT_SELECTORS);
    }

    excludeSelectors.push(...DEFAULT_EXCLUDE_SELECTORS);

    return { selectors, excludeSelectors };
  }


  /**
   * Extract metadata from the URL.
   * @param url The URL of the document.
   * @param buffer The content buffer of the document.
   * @private
   */
  private extractMetadata (url: string, buffer: Buffer): Record<string, any> {
    const extractors = this.getMatchedMetadataExecutors(url) ?? DEFAULT_METADATA_EXTRACTOR;
    if (extractors.length === 0) {
      return {};
    }

    const $ = cheerio.load(buffer);
    const metadata: ExtractedMetadata = {};

    for (let extractor of extractors) {
      if (extractor.type === MetadataExtractorType.URL_METADATA_EXTRACTOR) {
        Object.assign(metadata, this.extractMetadataFromURL(url, extractor));
      } else if (extractor.type === MetadataExtractorType.HTML_METADATA_EXTRACTOR) {
        Object.assign(metadata, this.extractMetadataFromHTML($, extractor));
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

  private extractMetadataFromURL (url: string, extractor: URLMetadataExtractor) {
    const urlMatch = match(extractor.urlMetadataPattern, {
      decode: decodeURIComponent,
    });

    const urlObj = new URL(url);
    const matchedMetadata = urlMatch(urlObj.pathname);

    if (matchedMetadata) {
      return this.excludeNonNamedParams(matchedMetadata.params);
    } else {
      return {};
    }
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

  private extractMetadataFromHTML($: CheerioAPI, extractor: HTMLMetadataExtractor): Record<string, any> {
    return {
      [extractor.key]: this.extractValuesFromHTML($, extractor),
    }
  }

}

Object.assign(HtmlLoader, htmlLoaderMeta);