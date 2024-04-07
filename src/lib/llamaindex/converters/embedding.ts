import { Flow } from '@/core';
import { rag } from '@/core/interface';
import { BaseEmbedding, OpenAIEmbedding } from 'llamaindex';
import ExtensionType = rag.ExtensionType;

export function getEmbedding (flow: Flow, provider: string, options: any) {
  if (provider === 'openai' || (provider === rag.ExtensionType.Embeddings + '.openai')) {
    return new OpenAIEmbedding(options);
  }
  return fromAppEmbedding(flow.getRequired(ExtensionType.Embeddings, provider).withOptions(options));
}

export function fromAppEmbedding (e: rag.Embeddings<any>) {
  return new RagEmbedding(e);
}

class RagEmbedding extends BaseEmbedding {
  constructor (private impl: rag.Embeddings<any>) {super();}

  async getTextEmbedding (text: string): Promise<number[]> {
    const [vector] = await this.impl.embedChunks([text]);
    return Array.from(vector);
  }

  async getQueryEmbedding (query: string): Promise<number[]> {
    const vector = await this.impl.embedQuery(query);
    return Array.from(vector);
  }
}
