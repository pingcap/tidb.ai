import { rag } from '@/core/interface';
import { BaseEmbedding } from 'llamaindex';

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
