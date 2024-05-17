import {z} from "zod";

export enum RerankerProvider {
  COHERE = 'cohere',
  JINAAI = 'jinaai',
  LLM = 'llm',
}

export const CohereRerankerOptions = z.object({
  apiKey: z.string().optional(),
  model: z.string().optional()
});

export const CohereRerankerConfig = z.object({
  provider: z.literal(RerankerProvider.COHERE),
  options: CohereRerankerOptions.optional(),
});

export const JinaAIRerankerOptions = z.object({
  model: z.string().optional(),
});

export const JinaAIRerankerConfig = z.object({
  provider: z.literal(RerankerProvider.JINAAI),
  options: JinaAIRerankerOptions.optional(),
});

export const LLMRerankerOptions = z.object({
  model: z.string().optional(),
});

export const LLMRerankerConfig = z.object({
  provider: z.literal(RerankerProvider.LLM),
  options: LLMRerankerOptions.optional(),
});

export const RerankerOptionsSchema = z.union([CohereRerankerOptions, JinaAIRerankerOptions, LLMRerankerOptions]);

export type RerankerOptions = z.infer<typeof RerankerOptionsSchema>;

export const RerankerConfigSchema = z.discriminatedUnion('provider', [CohereRerankerConfig, JinaAIRerankerConfig, LLMRerankerConfig]);

export type RerankerConfig = z.infer<typeof RerankerConfigSchema>;
