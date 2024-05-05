import {
  metadataFieldSchema,
  metadataFilterSchema
} from "@/lib/llamaindex/postprocessors/postfilters/MetadataPostFilter";
import {z} from "zod";

export enum MetadataFilterProvider {
  DEFAULT = 'default',
}

export const DefaultMetadataFilterOptions = z.object({
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
