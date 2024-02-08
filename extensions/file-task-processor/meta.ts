import { rag } from '@/core/interface';
import { z } from 'zod';
import Readme from './readme.mdx';

export interface FileTaskProcessorOptions {
}

const identifier = 'rag.import-source-task.file';
const displayName = 'File processor';
const optionsSchema = z.object({});

const fileTaskProcessorMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<any>;

export default fileTaskProcessorMeta;
