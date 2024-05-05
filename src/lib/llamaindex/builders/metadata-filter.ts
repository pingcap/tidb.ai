import {
  metadataFieldSchema,
  metadataFilterSchema,
  MetadataPostFilter
} from "@/lib/llamaindex/postprocessors/postfilters/MetadataPostFilter";
import {ServiceContext} from 'llamaindex';
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

export function buildMetadataFilter (serviceContext: ServiceContext, { provider, options }: MetadataFilterConfig) {
    switch (provider) {
      case 'default':
        return new MetadataPostFilter({
          ...options,
          serviceContext,
        });
      default:
        throw new Error(`Unknown metadata filter provider: ${provider}`)
    }
}
