import {observeQuestionGenerator} from "@/lib/langfuse/llamaindex/question-generator";
import {QueryEngineContext} from "@/lib/llamaindex/builders/query-engine";
import {QuestionGeneratorConfig, QuestionGeneratorProvider} from "@/lib/llamaindex/config/question-generator";
import {promptParser} from "@/lib/llamaindex/prompts/PromptParser";
import {KGBasedQuestionGenerator} from "@/lib/llamaindex/question-generator/KGBasedQuestionGenerator";
import {LangfuseTraceClient} from "langfuse";
import {defaultSubQuestionPrompt, LLMQuestionGenerator} from "llamaindex";
import type {BaseQuestionGenerator} from "llamaindex/engines/query/types";

export const DEFAULT_QUESTION_GENERATOR_CONFIG: QuestionGeneratorConfig = {
  provider: QuestionGeneratorProvider.LLM,
  options: {}
};

export async function buildQuestionGenerator (
  config: QuestionGeneratorConfig = DEFAULT_QUESTION_GENERATOR_CONFIG,
  query: string,
  promptContext: Record<string, any>,
  ctx: QueryEngineContext,
  trace?: LangfuseTraceClient,
): Promise<BaseQuestionGenerator> {
  switch (config.provider) {
    case QuestionGeneratorProvider.LLM:
      const generator = new LLMQuestionGenerator({
        prompt: promptParser.getPrompt(config.options?.prompt, defaultSubQuestionPrompt, promptContext),
        llm: ctx.llm
      });
      return observeQuestionGenerator(generator, trace);
    case QuestionGeneratorProvider.KNOWLEDGE_GRAPH:
      const kgContext = await ctx.graphRetriever.retrieveKnowledgeGraph({ query });
      const kgBasedGenerator = new KGBasedQuestionGenerator({
        prompt: config.options?.prompt,
        llm: ctx.llm,
        kgContext
      });
      return observeQuestionGenerator(kgBasedGenerator, trace);
    default:
      throw new Error(`Unknown question generator provider: ${config}`)
  }
}
