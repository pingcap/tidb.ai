import {buildQuestionGenerator} from "@/lib/llamaindex/builders/question-generator";
import {QueryEngineConfig, QueryEngineProvider} from "@/lib/llamaindex/config/query-engine";
import {LangfuseTraceClient} from "langfuse";
import {
  BaseRetriever, BaseSynthesizer,
  QueryEngine,
  QueryEngineTool,
  RetrieverQueryEngine,
  SubQuestionQueryEngine
} from "llamaindex";
import {BaseLLM} from "llamaindex/llm/base";

export interface QueryEngineContext {
  llm: BaseLLM,
  retriever: BaseRetriever
  synthesizer: BaseSynthesizer
}

export function buildQueryEngine(
  context: QueryEngineContext,
  config: QueryEngineConfig,
  promptContext: Record<string, any>,
  trace?: LangfuseTraceClient
): QueryEngine {
  switch (config.provider) {
    case QueryEngineProvider.RETRIEVER:
      return new RetrieverQueryEngine(context.retriever, context.synthesizer);
    case QueryEngineProvider.SUB_QUESTION:
      // Build subquestion generator.
      const questionGeneratorConfig = config.options?.question_generator;
      const questionGenerator = buildQuestionGenerator(questionGeneratorConfig, promptContext, context.llm, trace);
      const retrieverQueryEngine = new RetrieverQueryEngine(context.retriever, context.synthesizer);

      // Build subquestion query engine.
      return new SubQuestionQueryEngine({
        questionGen: questionGenerator,
        responseSynthesizer: context.synthesizer,
        queryEngineTools: [
          new QueryEngineTool({
            queryEngine: retrieverQueryEngine,
            metadata: {
              name: 'retriever',
              description: 'Retriever based query engine',
            }
          })
        ],
      });
    default:
      throw new Error(`Unknown query engine provider: ${config}`);
  }
}