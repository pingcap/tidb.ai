import {z} from "zod";

export enum QuestionGeneratorProvider {
  LLM = 'llm',
}

export const QuestionGeneratorProviderSchema = z.nativeEnum(QuestionGeneratorProvider);

export const LLMQuestionGeneratorOptionsSchema = z.object({
  prompt: z.string().optional(),
});

export const LLMQuestionGeneratorConfigSchema = z.object({
  provider: z.literal(QuestionGeneratorProviderSchema.enum.LLM),
  options: LLMQuestionGeneratorOptionsSchema.optional()
});

export const QuestionGeneratorConfigSchema = z.discriminatedUnion('provider', [
  LLMQuestionGeneratorConfigSchema
]);

export type QuestionGeneratorConfig = z.infer<typeof QuestionGeneratorConfigSchema>;