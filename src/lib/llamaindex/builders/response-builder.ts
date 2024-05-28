import {ResponseBuilderConfig, ResponseBuilderProvider} from "@/lib/llamaindex/config/response-builder";
import {promptParser} from "@/lib/llamaindex/prompts/PromptParser";
import {CompactAndRefine, defaultRefinePrompt, defaultTextQaPrompt, Refine, ServiceContext} from "llamaindex";
import type {ResponseBuilder} from "llamaindex/synthesizers/types";

export function buildResponseBuilder (
  serviceContext: ServiceContext,
  config: ResponseBuilderConfig = {
    provider: ResponseBuilderProvider.COMPACT_AND_REFINE,
    options: {}
  },
  prompts: Record<string, any>,
  promptContext: Record<string, any>
): ResponseBuilder {
  switch (config.provider) {
    case ResponseBuilderProvider.REFINE:
    case ResponseBuilderProvider.COMPACT_AND_REFINE:
      const {textQa, refine} = prompts;
      const textQaPrompt = promptParser.getPrompt(config.options?.textQATemplate || textQa, defaultTextQaPrompt, promptContext);
      const refinePrompt = promptParser.getPrompt(config.options?.refineTemplate || refine, defaultRefinePrompt, promptContext);

      if (config.provider === ResponseBuilderProvider.REFINE) {
        return new Refine(serviceContext, textQaPrompt, refinePrompt);
      } else {
        return new CompactAndRefine(serviceContext, textQaPrompt, refinePrompt);
      }
    default:
      throw new Error(`Unknown response builder provider: ${config}`)
  }
}
