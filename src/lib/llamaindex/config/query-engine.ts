import {QuestionGeneratorConfigSchema} from "@/lib/llamaindex/config/question-generator";
import {z} from "zod";

export enum QueryEngineProvider {
  RETRIEVER = 'retriever',
  SUB_QUESTION = 'sub-question'
}

export const QueryEngineProviderSchema = z.nativeEnum(QueryEngineProvider);

export const RetrieverQueryEngineOptionsSchema = z.object({

});

export const RetrieverQueryEngineConfigSchema = z.object({
  provider: z.literal(QueryEngineProvider.RETRIEVER),
  options: RetrieverQueryEngineOptionsSchema.optional()
});

export const SubQuestionQueryEngineOptionsSchema = z.object({
  question_generator: QuestionGeneratorConfigSchema.optional()
});

export const SubQuestionQueryEngineConfigSchema = z.object({
  provider: z.literal(QueryEngineProvider.SUB_QUESTION),
  options: SubQuestionQueryEngineOptionsSchema.optional()
});

export const QueryEngineConfigSchema = z.discriminatedUnion('provider', [
  RetrieverQueryEngineConfigSchema,
  SubQuestionQueryEngineConfigSchema
]);

export type QueryEngineConfig = z.infer<typeof QueryEngineConfigSchema>;