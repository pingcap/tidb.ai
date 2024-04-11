import { rag } from '@/core/interface';
import {htmlSelectorArray, type HtmlSelectorItemType} from '@/lib/zod-extensions/types/html-selector-array';
import { z } from 'zod';
import Readme from './readme.mdx';
import BaseMeta = rag.BaseMeta;

export const DEFAULT_TEXT_SELECTORS: HtmlSelectorItemType[] = [
  { selector: 'body', all: false, type: 'dom-text' }
]

export const DEFAULT_EXCLUDE_SELECTORS: HtmlSelectorItemType[] = [
  { selector: 'script', all: true }
];

/**
 * The rule to extract content from the HTML document.
 */
export const contentExtractionSchema = z.object({
  // TODO: rename to urlPattern is better
  url: z.string(),
  excludeSelectors: htmlSelectorArray().default(DEFAULT_EXCLUDE_SELECTORS),
  selectors: htmlSelectorArray(),
});

export type ContentExtraction = z.infer<typeof contentExtractionSchema>;

/**
 * Metadata Extractor Type
 */
export enum MetadataExtractorType {
  URL_METADATA_EXTRACTOR = 'url-metadata-extractor',
  HTML_METADATA_EXTRACTOR = 'html-metadata-extractor',
}

export const ExtractedMetadataSchema = z.record(z.string(), z.string().or(z.string().array())).default({});

export type ExtractedMetadata = z.infer<typeof ExtractedMetadataSchema>;

/**
 * The base executor to extract metadata from the HTML document.
 */
export const metadataExtractorSchema = z.object({
  /**
   * The type of the extractor.
   */
  type: z.nativeEnum(MetadataExtractorType),
  /**
   * The default metadata to be extracted.
   *
   * The parameter in the pattern can be optional, and the default value will be used if the parameter is not found.
   */
  defaultMetadata: z.record(z.string(), z.string().or(z.string().array())).default({}).optional(),
});

export type MetadataExtractor = z.infer<typeof metadataExtractorSchema>;

/**
 * The URL Metadata Extractor.
 */
export const URLMetadataExtractor = metadataExtractorSchema.extend({
  type: z.literal(MetadataExtractorType.URL_METADATA_EXTRACTOR),
  /**
   *
   * The pattern to match the metadata in the URL.
   *
   * For example, if the url is "https://docs.pingcap.com/zh/tidb/stable/overview", the `extractPattern` field can be:
   *
   * ```plain
   * https://docs.pingcap.com/:language(zh|jp)?/:product(tidb|tidbcloud)/:version(dev|stable|v\d/\d)/(.*)
   * ```
   *
   * So the extracted labels will be:
   *
   * ```json
   * {
   *  language: "zh",
   *  product: "tidb",
   *  version: "stable"
   * }
   * ```
   *
   * Check {@link https://github.com/pillarjs/path-to-regexp} for more information.
   */
  urlMetadataPattern: z.string()
});

export type URLMetadataExtractor = z.infer<typeof URLMetadataExtractor> & MetadataExtractor;

/**
 * The extraction to extract metadata from the URL / HTML document.
 */
export const metadataExtractionSchema = z.object({
  /**
   * `urlPattern` is used to match the URL which the rule should be applied to.
   */
  urlPattern: z.string(),
  /**
   * The extractors to be used.
   */
  extractors: URLMetadataExtractor.array(),
});

export type MetadataExtraction = z.infer<typeof metadataExtractionSchema>;

/**
 * The options for the HTML loader.
 */
export const htmlLoaderOptionsSchema = z.object({
  /**
   * The configuration for content extraction.
   */
  contentExtraction: contentExtractionSchema.array(),
  /**
   * The configuration for metadata extraction.
   */
  metadataExtraction: metadataExtractionSchema.array(),
});

export type HtmlLoaderOptions = z.infer<typeof htmlLoaderOptionsSchema>;

/**
 * The metadata of the HTML loader.
 */
const htmlLoaderMeta: BaseMeta<HtmlLoaderOptions> = {
  identifier: 'rag.loader.html',
  displayName: 'HTML Loader',
  optionsSchema: htmlLoaderOptionsSchema,
  description: Readme,
};

export default htmlLoaderMeta;
