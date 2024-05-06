import {getEnv} from "@/lib/env";
import {RerankerConfig, RerankerProvider} from "@/lib/llamaindex/config/reranker";
import {ServiceContext} from "llamaindex";

export async function buildReranker (serviceContext: ServiceContext, { provider, options }: RerankerConfig, top_k: number) {
    switch (provider) {
      case RerankerProvider.COHERE:
        const { CohereRerank } = await import('llamaindex');
        return new CohereRerank({
          apiKey: getEnv('COHERE_TOKEN'),
          ...options,
          topN: top_k,
        });
      case RerankerProvider.JINAAI:
        const { JinaAIReranker } = await import('llamaindex');
        return new JinaAIReranker({
          ...options,
          topN: top_k,
        });
      case RerankerProvider.LLM:
        const { LLMRerank } = await import('@/lib/llamaindex/postprocessors/rerankers/LLMReranker');
        return new LLMRerank({
          ...options,
          topN: top_k,
          serviceContext: serviceContext,
        });
      default:
        throw new Error(`Unknown rerank provider: ${provider}`)
    }
}
