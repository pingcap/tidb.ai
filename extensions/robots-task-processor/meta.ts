import { rag } from '@/core/interface';
import { z } from 'zod';
import Readme from './readme.mdx';

export interface RobotsTaskProcessorOptions {
}
const identifier = 'rag.import-source-task.robots';
const displayName = 'Robots.txt processor';
const optionsSchema = z.object({});

const robotsTaskProcessorMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<RobotsTaskProcessorOptions>;

export default robotsTaskProcessorMeta;