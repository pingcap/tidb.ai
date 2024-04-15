import {getEnv} from "@/lib/env";
import {LLMRerank} from "@/lib/llamaindex/postprocessors/rerankers/LLMReranker";
import {CohereRerank, ServiceContext} from 'llamaindex';

export function getReranker (serviceContext: ServiceContext, provider: string, options: any, top_k: number) {
    switch (provider) {
      case 'cohere':
        return new CohereRerank({
          apiKey: getEnv('COHERE_TOKEN'),
          ...options,
          topN: top_k,
        });
      case 'llm':
        return new LLMRerank({
          llm: serviceContext.llm,
          topN: top_k,
        });
      default:
        throw new Error(`Unknown rerank provider: ${provider}`)
    }
}
