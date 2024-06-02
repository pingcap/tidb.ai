import {LLMConfigSchema} from "@/lib/llamaindex/config/llm";
import {z} from "zod";

export const metadataFilterSchema = z.object({
  name: z.string(),
  // TBD
  // op: z.string().optional(),
  value: z.any(),
  optional: z.boolean().optional()
});

export type MetadataFieldFilter = z.infer<typeof metadataFilterSchema>;

export const metadataFieldSchema = z.object({
  name: z.string(),
  type: z.string(),
  enums: z.array(z.string()).optional(),
  default: z.string().optional(),
  choicePrompt: z.string().optional(),
});

export type MetadataField = z.infer<typeof metadataFieldSchema>;

export enum MetadataFilterProvider {
  DEFAULT = 'default',
}

export const DefaultMetadataFilterOptions = z.object({
  llm: LLMConfigSchema,
  metadata_fields: z.array(metadataFieldSchema).optional(),
  filters: z.array(metadataFilterSchema).optional()
});

export const DefaultMetadataFilterConfig = z.object({
  provider: z.literal(MetadataFilterProvider.DEFAULT),
  options: DefaultMetadataFilterOptions.optional(),
});

export const MetadataFilterConfigSchema = z.discriminatedUnion('provider', [
  DefaultMetadataFilterConfig
]);

export type MetadataFilterConfig = z.infer<typeof MetadataFilterConfigSchema>;
