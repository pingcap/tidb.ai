import {z} from "zod";

export enum ResponseBuilderProvider {
  REFINE = 'refine',
  COMPACT_AND_REFINE = 'compact-and-refine',
}

export const ResponseBuilderProviderSchema = z.nativeEnum(ResponseBuilderProvider);

export const RefineOptionsSchema = z.object({
  textQATemplate: z.string().optional(),
  refineTemplate: z.string().optional(),
});

export const RefineConfigSchema = z.object({
  provider: z.literal(ResponseBuilderProviderSchema.enum.REFINE),
  options: RefineOptionsSchema.optional(),
});

export const CompactAndRefineConfigSchema = z.object({
  provider: z.literal(ResponseBuilderProviderSchema.enum.COMPACT_AND_REFINE),
  options: RefineOptionsSchema.optional(),
});

export const ResponseBuilderConfigSchema = z.discriminatedUnion('provider', [
  RefineConfigSchema,
  CompactAndRefineConfigSchema
]);

export type ResponseBuilderConfig = z.infer<typeof ResponseBuilderConfigSchema>;
