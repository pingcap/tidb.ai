import {LLMConfigSchema} from "@/lib/llamaindex/config/llm";
import {MetadataFilterConfigSchema} from "@/lib/llamaindex/config/metadata-filter";
import {RerankerConfigSchema} from "@/lib/llamaindex/config/reranker";
import {z} from "zod";

export const RetrieverOptionsSchema = z.object({
  search_top_k: z.coerce.number().int().optional(),
  top_k: z.coerce.number().int().optional()
});

export const GraphRetrieverOptionsSchema = z.object({
  enable: z.coerce.boolean().optional(),
  reranker: RerankerConfigSchema.optional(),
  top_k: z.coerce.number().int().optional()
});

export const BaseChatEngineOptionsSchema = z.object({
  index_id: z.coerce.number().int(),
  llm: LLMConfigSchema.optional(),
});

export const CondenseQuestionChatEngineOptionsSchema = BaseChatEngineOptionsSchema.extend({
  retriever: RetrieverOptionsSchema.optional(),
  graph_retriever: GraphRetrieverOptionsSchema.optional(),
  reranker: RerankerConfigSchema.optional(),
  metadata_filter: MetadataFilterConfigSchema.optional(),
  prompts: z.object({
    textQa: z.string().optional(),
    refine: z.string().optional(),
    condenseQuestion: z.string().optional(),
  }).optional(),
  // reverse the context from the standard rag retriever / reranker (not affect graph retriever)
  reverse_context: z.boolean().optional(),
});

export type CondenseQuestionChatEngineOptions = z.infer<typeof CondenseQuestionChatEngineOptionsSchema>;
