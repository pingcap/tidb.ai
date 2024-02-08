import { rag } from '@/core/interface';
import { htmlSelectorArray } from '@/lib/zod-extensions/types/html-selector-array';
import { z } from 'zod';
import Readme from './readme.mdx';
import BaseMeta = rag.BaseMeta;

const contentExtractionConfigSchema = z.object({
  url: z.string(),
  selectors: htmlSelectorArray(),
}).array();

export interface HtmlLoaderOptions {
  // rehypeParse?: RehypeParseOptions;
  contentExtraction?: z.infer<typeof contentExtractionConfigSchema>;
}

export const optionsSchema = z.object({
  // rehypeParse: z.object({}).passthrough().optional(),
  contentExtraction: contentExtractionConfigSchema.optional(),
});

const htmlLoaderMeta: BaseMeta<HtmlLoaderOptions> = {
  identifier: 'rag.loader.html2',
  displayName: 'HTML Loader',
  optionsSchema,
  description: Readme,
};

export default htmlLoaderMeta;
