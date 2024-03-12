import { rag } from '@/core/interface';
import { z } from 'zod';
import Readme from './readme.mdx';

export interface OpenaiEmbeddingsOptions {
  model?: string;
  apiKey?: string;
}

const identifier = 'rag.embeddings.openai';
const displayName = 'OpenAI Embeddings';
const optionsSchema = z.object({
  model: z.string().optional(),
  apiKey: z.string().optional().placeholder('OPENAI_API_KEY'),
});

const openaiEmbeddingsMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<OpenaiEmbeddingsOptions>;

export default openaiEmbeddingsMeta;
