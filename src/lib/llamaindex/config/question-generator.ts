import {z} from "zod";

export enum QuestionGeneratorProvider {
  LLM = 'llm',
  KNOWLEDGE_GRAPH = 'knowledge-graph',
}

export const QuestionGeneratorProviderSchema = z.nativeEnum(QuestionGeneratorProvider);

export const LLMQuestionGeneratorOptionsSchema = z.object({
  prompt: z.string().optional(),
});

export const LLMQuestionGeneratorConfigSchema = z.object({
  provider: z.literal(QuestionGeneratorProviderSchema.enum.LLM),
  options: LLMQuestionGeneratorOptionsSchema.optional()
});

export const KGBasedQuestionGeneratorOptionsSchema = z.object({
  prompt: z.string().optional(),
});

export const KGBasedQuestionGeneratorConfigSchema = z.object({
  provider: z.literal(QuestionGeneratorProviderSchema.enum.KNOWLEDGE_GRAPH),
  options: KGBasedQuestionGeneratorOptionsSchema.optional()
});

export const QuestionGeneratorConfigSchema = z.discriminatedUnion('provider', [
  LLMQuestionGeneratorConfigSchema,
  KGBasedQuestionGeneratorConfigSchema
]);

export type QuestionGeneratorConfig = z.infer<typeof QuestionGeneratorConfigSchema>;