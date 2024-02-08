import { rag } from '@/core/interface';
import { Options as HastUtilToText } from 'hast-util-to-text';
import { Options as RemarkParseOptions } from 'remark-parse';
import type { Options as RemarkRehypeOptions } from 'remark-rehype';
import { z } from 'zod';
import Readme from './readme.mdx';

export interface MarkdownLoaderOptions {
  remarkParse?: RemarkParseOptions;
  remarkRehype?: RemarkRehypeOptions;
  toText?: HastUtilToText;
}

const identifier = 'rag.loader.markdown';
const displayName = 'Markdown loader';
const optionsSchema = z.object({});

const markdownLoaderMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<MarkdownLoaderOptions>;

export default markdownLoaderMeta;
