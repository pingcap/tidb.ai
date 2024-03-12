import { rag } from '@/core/interface';
import { getOptionalEnv } from '@/lib/env';
import { CohereClient } from 'cohere-ai';
import cohereRerankerMeta, { type CohereRerankerOptions } from './meta';

export default class CohereReranker extends rag.Reranker<CohereRerankerOptions> {

  private readonly agent: CohereClient;

  constructor (options: CohereRerankerOptions) {
    super(options);
    this.agent = new CohereClient({ token: options.token ?? getOptionalEnv('COHERE_TOKEN') ?? '' });
  }

  async rerank (query: string, content: rag.RetrievedContext[], top_n: number) {
    const result = await this.agent.rerank({
      documents: content.map((chunk) => ({
        text: chunk.text_content,
      })),
      query,
      topN: top_n,
      model: this.options.model,
      returnDocuments: false,
    });

    return {
      results: result.results.map(result => ({
        ...content[result.index],
        relevance_score: result.relevanceScore,
        semantic_search_index: result.index,
      })),
      metadata: {
        id: result.id,
        meta: result.meta,
      },
    };
  }

}

Object.assign(CohereReranker, cohereRerankerMeta);
