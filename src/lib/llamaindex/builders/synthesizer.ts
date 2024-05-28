import {buildResponseBuilder} from "@/lib/llamaindex/builders/response-builder";
import {SynthesizerConfig, SynthesizerProvider} from "@/lib/llamaindex/config/synthesizer";
import {
  BaseSynthesizer, MetadataMode, ResponseSynthesizer,
  ServiceContext
} from "llamaindex";

export function buildSynthesizer (
  serviceContext: ServiceContext,
  config: SynthesizerConfig = {
    provider: SynthesizerProvider.RESPONSE,
    options: {}
  },
  prompts: Record<string, any>,
  promptContext: Record<string, any>
): BaseSynthesizer {
  switch (config.provider) {
    case SynthesizerProvider.RESPONSE:
      const {response_builder} = config.options || {};
      const responseBuilder = buildResponseBuilder(serviceContext, response_builder, prompts, promptContext);
      return new ResponseSynthesizer({
        serviceContext,
        responseBuilder,
        metadataMode: MetadataMode.LLM,
      });
    default:
      throw new Error(`Unknown synthesizer provider: ${config}`)
  }
}
