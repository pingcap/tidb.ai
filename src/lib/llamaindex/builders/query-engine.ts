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

export interface QueryEngineDependencies {
  retriever: BaseRetriever
  synthesizer: BaseSynthesizer
}

export function buildQueryEngine(config: QueryEngineConfig, deps: QueryEngineDependencies, trace?: LangfuseTraceClient): QueryEngine {
  switch (config.provider) {
    case QueryEngineProvider.RETRIEVER:
      return new RetrieverQueryEngine(deps.retriever, deps.synthesizer);
    case QueryEngineProvider.SUB_QUESTION:
      // Build subquestion generator.
      const questionGenerator = buildQuestionGenerator(config.options?.question_generator, trace);
      const retrieverQueryEngine = new RetrieverQueryEngine(deps.retriever, deps.synthesizer);

      // Build subquestion query engine.
      return new SubQuestionQueryEngine({
        questionGen: questionGenerator,
        responseSynthesizer: deps.synthesizer,
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