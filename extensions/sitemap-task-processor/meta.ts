import { rag } from '@/core/interface';
import { z } from 'zod';
import Readme from './readme.mdx';

export interface SitemapTaskProcessorOptions {
}

const identifier = 'rag.import-source-task.sitemap';
const displayName = 'Sitemap.xml processor';
const optionsSchema = z.object({});

const sitemapTaskProcessorMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<SitemapTaskProcessorOptions>;

export default sitemapTaskProcessorMeta;