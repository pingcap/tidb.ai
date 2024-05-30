import {TiDBAIKnowledgeGraphRetriever} from "@/core/services/knowledge-graph/retrieving";
import {buildQuestionGenerator} from "@/lib/llamaindex/builders/question-generator";
import {QueryEngineConfig, QueryEngineProvider} from "@/lib/llamaindex/config/query-engine";
import {HybridRetrieverQueryEngine} from "@/lib/llamaindex/query-engine/HybridRetrieverQueryEngine";
import {SubQuestionQueryEngine} from "@/lib/llamaindex/query-engine/SubQuestionQueryEngine";
import {LangfuseTraceClient} from "langfuse";
import {
  BaseRetriever, BaseSynthesizer,
  QueryEngine,
  QueryEngineTool,
  RetrieverQueryEngine,
} from "llamaindex";
import {BaseLLM} from "llamaindex/llm/base";

export interface QueryEngineContext {
  llm: BaseLLM;
  retriever: BaseRetriever;
  graphRetriever: TiDBAIKnowledgeGraphRetriever;
  synthesizer: BaseSynthesizer;
}

export async function buildQueryEngine(
  context: QueryEngineContext,
  config: QueryEngineConfig,
  query: string,
  promptContext: Record<string, any>,
  trace?: LangfuseTraceClient
): Promise<QueryEngine> {
  switch (config.provider) {
    case QueryEngineProvider.RETRIEVER:
      return new RetrieverQueryEngine(context.retriever, context.synthesizer);
    case QueryEngineProvider.SUB_QUESTION:
      // Build subquestion generator.
      const questionGeneratorConfig = config.options?.question_generator;
      const questionGenerator = await buildQuestionGenerator(questionGeneratorConfig, query, promptContext, context, trace);
      const retrieverQueryEngine = new HybridRetrieverQueryEngine(
        context.retriever,
        context.graphRetriever,
        context.synthesizer,
      );

      // Build subquestion query engine.
      return new SubQuestionQueryEngine({
        questionGen: questionGenerator,
        responseSynthesizer: context.synthesizer,
        queryEngineTools: [
          new QueryEngineTool({
            queryEngine: retrieverQueryEngine,
            metadata: {
              name: 'hybrid_retriever',
              description: 'Find relevant documents by combining vector index retriever and knowledge graph retriever.',
            }
          }),
        ],
      });
    default:
      throw new Error(`Unknown query engine provider: ${config}`);
  }
}