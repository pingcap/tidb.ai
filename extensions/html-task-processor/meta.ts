import { rag } from '@/core/interface';
import { z } from 'zod';
import Readme from './readme.mdx';

export interface HtmlTaskProcessorOptions {
}

const identifier = 'rag.import-source-task.html';
const displayName = 'HTML processor';
const optionsSchema = z.object({});

const htmlTaskProcessorMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<HtmlTaskProcessorOptions>;

export default htmlTaskProcessorMeta;
