import { rag } from '@/core/interface';
import { z } from 'zod';
import Readme from './readme.mdx';

export interface JinaAIRerankerOptions {
  token?: string;
  model?: string;
}

const identifier = 'rag.reranker.jinaai';
const displayName = 'Jina AI Reranker';
const optionsSchema = z.object({
  token: z.string().optional(),
  model: z.string().optional(),
});

const jinaaiRerankerMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<JinaAIRerankerOptions>;

export default jinaaiRerankerMeta;
