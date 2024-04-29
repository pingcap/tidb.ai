import {rag} from '@/core/interface';
import {
  HTMLExecutor,
  HTMLExecutorSchema,
  HTMLSelector,
  htmlSelectorArray
} from '@/lib/zod-extensions/types/html-selector-array';
import {z} from 'zod';
import Readme from './readme.mdx';
import BaseMeta = rag.BaseMeta;

/**
 * The content extraction schema.
 */

export const DEFAULT_TEXT_SELECTORS: HTMLExecutor[] = [
  { selector: 'body' }
]

export const DEFAULT_EXCLUDE_SELECTORS: HTMLSelector[] = [
  { selector: 'script', all: true },
  { selector: 'style', all: true }
];

export const ContentExtractionSchema = z.object({
  // TODO: rename to urlPattern is better
  url: z.string(),
  excludeSelectors: htmlSelectorArray().default(DEFAULT_EXCLUDE_SELECTORS),
  selectors: htmlSelectorArray(),
});

export type ContentExtraction = z.infer<typeof ContentExtractionSchema>;

/**
 * Metadata Extractor Type
 */

export enum MetadataExtractorType {
  URL_METADATA_EXTRACTOR = 'url-metadata-extractor',
  HTML_METADATA_EXTRACTOR = 'html-metadata-extractor',
}

export const DEFAULT_METADATA_EXTRACTOR: MetadataExtractor[] = [
  { type: MetadataExtractorType.HTML_METADATA_EXTRACTOR, selector: 'head > title', key: 'title',  }
]

export const ExtractedValues = z.string().or(z.string().array());

export const ExtractedMetadataSchema = z.record(z.string(), ExtractedValues).default({});

export type ExtractedMetadata = z.infer<typeof ExtractedMetadataSchema>;

/**
 * The Base Metadata Extractor.
 */
const baseMetadataExtractorSchema = z.object({
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

/**
 * The URL Metadata Extractor.
 */
export const URLMetadataExtractorSchema = baseMetadataExtractorSchema.extend({
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

export type URLMetadataExtractor = z.infer<typeof URLMetadataExtractorSchema>;

/**
 * The HTML Metadata Extractor.
 */
export const HTMLMetadataExtractorSchema = baseMetadataExtractorSchema.merge(HTMLExecutorSchema).extend({
  type: z.literal(MetadataExtractorType.HTML_METADATA_EXTRACTOR),
  /**
   * The key to store the metadata.
   */
  key: z.string(),
});

export type HTMLMetadataExtractor = z.infer<typeof HTMLMetadataExtractorSchema>;

/**
 * The base executor to extract metadata from the HTML document.
 */
export const metadataExtractorSchema = z.discriminatedUnion('type', [
  URLMetadataExtractorSchema,
  HTMLMetadataExtractorSchema
])

export type MetadataExtractor = z.infer<typeof metadataExtractorSchema>;

/**
 * The extraction to extract metadata from the URL / HTML document.
 */
export const MetadataExtractionSchema = z.object({
  /**
   * `urlPattern` is used to match the URL which the rule should be applied to.
   */
  urlPattern: z.string(),
  /**
   * The extractors to be used.
   */
  extractors: metadataExtractorSchema.array(),
});

export type MetadataExtraction = z.infer<typeof MetadataExtractionSchema>;

/**
 * The options for the HTML loader.
 */
export const htmlLoaderOptionsSchema = z.object({
  /**
   * The configuration for content extraction.
   */
  contentExtraction: ContentExtractionSchema.array().optional(),
  /**
   * The configuration for metadata extraction.
   */
  metadataExtraction: MetadataExtractionSchema.array().optional(),
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
