import {z} from "zod";

export enum LLMProvider {
  OPENAI = 'openai',
  BITDEER = 'bitdeer',
  OLLAMA = 'ollama',
}

export const BaseLLMOptionsSchema = z.object({
  model: z.string(),
  stream: z.literal(true).optional(),
});

export enum OpenAIModel {
  GPT_3_5_TURBO = 'gpt-3.5-turbo',
  GPT_3_5_TURBO_0613 = 'gpt-3.5-turbo-0613',
  GPT_3_5_TURBO_16K = 'gpt-3.5-turbo-16k',
  GPT_3_5_TURBO_16K_0613 = 'gpt-3.5-turbo-16k-0613',
  GPT_3_5_TURBO_1106 = 'gpt-3.5-turbo-1106',
  GPT_3_5_TURBO_0125 = 'gpt-3.5-turbo-0125',
  GPT_4 = 'gpt-4',
  GPT_4_32K = 'gpt-4-32k',
  GPT_4_32K_0613 = 'gpt-4-32k-0613',
  GPT_4_TURBO = 'gpt-4-turbo',
  GPT_4_TURBO_PREVIEW = 'gpt-4-turbo-preview',
  GPT_4_1106_PREVIEW = 'gpt-4-1106-preview',
  GPT_4_0125_PREVIEW = 'gpt-4-0125-preview',
  GPT_4_VISION_PREVIEW = 'gpt-4-vision-preview',
}

export const OpenAIModelSchema = z.nativeEnum(OpenAIModel);

export const OpenAIOptionsSchema = BaseLLMOptionsSchema.extend({
  model: OpenAIModelSchema,
  temperature: z.number().optional(),
  topP: z.number().optional(),
  maxTokens: z.number().optional(),
  apiKey: z.string().optional(),
  maxRetries: z.number().optional(),
  timeout: z.number().optional(),
  additionalChatOptions: z.record(z.string(), z.any()).optional(),
});

export const OpenAIConfigSchema = z.object({
  provider: z.literal(LLMProvider.OPENAI),
  options: OpenAIOptionsSchema.optional(),
});

export const BitdeerOptionsSchema = BaseLLMOptionsSchema.extend({
  model: z.enum(["llama2", "mistral"]).optional().default("mistral"),
  baseURL: z.string().optional(),
  temperature: z.number().optional(),
  topP: z.number().optional(),
  contextWindow: z.number().optional(),
  requestTimeout: z.number().optional(),
  apiSecretAccessKey: z.string().optional(),
});

export const BitdeerConfigSchema = z.object({
  provider: z.literal(LLMProvider.BITDEER),
  options: BitdeerOptionsSchema.optional(),
});

export const OllamaOptionsSchema = BaseLLMOptionsSchema.extend({
  model: z.string(),
  options: z.record(z.string(), z.any()).optional(),
});

export const OllamaConfigSchema = z.object({
  provider: z.literal(LLMProvider.OLLAMA),
  options: OllamaOptionsSchema.optional(),
});

export const LLMConfigSchema = z.discriminatedUnion('provider', [
  OpenAIConfigSchema,
  BitdeerConfigSchema,
  OllamaConfigSchema,
]);

export type LLMConfig = z.infer<typeof LLMConfigSchema>;
