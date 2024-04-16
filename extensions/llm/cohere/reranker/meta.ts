import { rag } from '@/core/interface';
import { z } from 'zod';
import Readme from './readme.mdx';

export interface CohereRerankerOptions {
  token?: string;
  model?: string;
}

const identifier = 'rag.reranker.cohere';
const displayName = 'Cohere Reranker';
const optionsSchema = z.object({
  token: z.string().optional(),
  model: z.string().optional(),
});

const cohereRerankerMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<CohereRerankerOptions>;

export default cohereRerankerMeta;
