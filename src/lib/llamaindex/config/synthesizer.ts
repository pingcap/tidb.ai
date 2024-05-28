import {ResponseBuilderConfigSchema} from "@/lib/llamaindex/config/response-builder";
import {z} from "zod";

export enum SynthesizerProvider {
  RESPONSE = 'response'
}

export const SynthesizerProviderSchema = z.nativeEnum(SynthesizerProvider);

export const ResponseSynthesizerOptionsSchema = z.object({
  response_builder: ResponseBuilderConfigSchema.optional(),
});

export const ResponseSynthesizerConfigSchema = z.object({
  provider: z.literal(SynthesizerProviderSchema.enum.RESPONSE),
  options: ResponseSynthesizerOptionsSchema.optional(),
});

export const SynthesizerConfigSchema = z.discriminatedUnion('provider', [
  ResponseSynthesizerConfigSchema,
]);

export type SynthesizerConfig = z.infer<typeof SynthesizerConfigSchema>;
