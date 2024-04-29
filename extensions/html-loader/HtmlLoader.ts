import {rag} from '@/core/interface';
import {md5} from '@/lib/digest';
import {createUrlMatcher} from '@/lib/url-matcher';
import {HTMLExecutor, HTMLSelector} from "@/lib/zod-extensions/types/html-selector-array";
import {CheerioAPI} from "cheerio";
import * as cheerio from 'cheerio';
import {match} from 'path-to-regexp';
import htmlLoaderMeta, {
  DEFAULT_EXCLUDE_SELECTORS, DEFAULT_METADATA_EXTRACTOR,
  DEFAULT_TEXT_SELECTORS,
  ExtractedMetadata,
  type HtmlLoaderOptions, HTMLMetadataExtractor,
  MetadataExtractor,
  MetadataExtractorType, URLMetadataExtractor,
} from './meta';

export default class HtmlLoader extends rag.Loader<HtmlLoaderOptions, {}> {
  constructor(options: HtmlLoaderOptions) {
    super({
      contentExtraction: options.contentExtraction ?? [],
      metadataExtraction: options.metadataExtraction ?? [],
    });
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

  private extractValuesFromHTML($: CheerioAPI, extractor: HTMLExecutor): string[] | string {
    const elements = extractor.all ? $(extractor.selector) : $(extractor.selector).first();
    const values = elements.map((_, element) => {
      switch (extractor.extract) {
        case 'attr':
          return $(element).attr(extractor.attr!);
        case 'prop':
          return $(element).prop(extractor.prop!);
        default:
          return $(element).text();
      }
    });

    return extractor.all ? values.get() : values.get(0)!;
  }

  private getMatchedContentSelectors (url: string) {
    const selectors: HTMLExecutor[] = [];
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