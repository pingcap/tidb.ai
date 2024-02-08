import { rag } from '@/core/interface';
import { env } from '@/lib/zod-extensions/types/env';
import { OpenAIEmbeddings } from '@langchain/openai';
import { z } from 'zod';
import Readme from './readme.mdx';

export interface OpenaiEmbeddingsOptions {
  fields?: ConstructorParameters<typeof OpenAIEmbeddings>[0];
  configuration?: ConstructorParameters<typeof OpenAIEmbeddings>[1];
}

const identifier = 'rag.embeddings.openai';
const displayName = 'OpenAI Embeddings';
const optionsSchema = z.object({
  fields: z.object({
    openAIApiKey: env('OPENAI_API_KEY'),
  }).optional(),
});

const openaiEmbeddingsMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<OpenaiEmbeddingsOptions>;

export default openaiEmbeddingsMeta;
