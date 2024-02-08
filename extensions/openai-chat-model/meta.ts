import { rag } from '@/core/interface';
import { env } from '@/lib/zod-extensions/types/env';
import { OpenAIEmbeddings } from '@langchain/openai';
import type { ClientOptions } from 'openai';
import { z } from 'zod';

import Readme from './readme.mdx';
export interface OpenaiChatModelOptions extends ClientOptions {
  model?: string;
}

const identifier = 'rag.chat-model.openai';
const displayName = 'OpenAI Chat';
const optionsSchema = z.object({
  apiKey: env('OPENAI_API_KEY'),
  model: z.string().default('gpt-3.5-turbo'),
});

const openaiChatModelMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme
} satisfies rag.BaseMeta<OpenaiChatModelOptions>;

export default openaiChatModelMeta;
