import { rag } from '@/core/interface';
import { getOptionalEnv } from '@/lib/env';
import { handleErrors } from '@/lib/fetch';
import jinaaiRerankerMeta, { type JinaAIRerankerOptions } from './meta';

type Data = {
  model: string
  usage: {
    total_tokens: number
    prompt_tokens: number
  }
  results: {
    index: number
    document: {
      text: string
    }
    relevance_score: number
  }[]
}

export default class JinaAIReranker extends rag.Reranker<JinaAIRerankerOptions> {
  private readonly token?: string;
  private readonly model: string;

  constructor (options: JinaAIRerankerOptions) {
    super(options);
    this.token = options.token ?? getOptionalEnv('JINAAI_TOKEN');
    this.model = options.model || 'jina-reranker-v1-base-en';
  }

  async rerank (query: string, content: rag.RetrievedContext[], top_n: number) {
    const data: Data = await fetch(`https://api.jina.ai/v1/rerank`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        model: this.model,
        query,
        documents: content.map(c => c.text_content),
        top_n,
      }),
    })
      .then(handleErrors)
      .then(res => res.json());

    return {
      results: data.results.map(result => ({
        ...content[result.index],
        relevance_score: result.relevance_score,
        semantic_search_index: result.index,
      })),
      metadata: {},
    };
  }

}

Object.assign(JinaAIReranker, jinaaiRerankerMeta);
