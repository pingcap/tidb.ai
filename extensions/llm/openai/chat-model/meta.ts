import { rag } from '@/core/interface';
import { z } from 'zod';

import Readme from './readme.mdx';

export interface OpenaiChatModelOptions {
  apiKey?: string;
  model?: string;
}

const identifier = 'rag.chat-model.openai';
const displayName = 'OpenAI Chat';
const optionsSchema = z.object({
  apiKey: z.string().optional().placeholder('OPENAI_API_KEY'),
  model: z.string().default('gpt-3.5-turbo'),
});

const openaiChatModelMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<OpenaiChatModelOptions>;

export default openaiChatModelMeta;
