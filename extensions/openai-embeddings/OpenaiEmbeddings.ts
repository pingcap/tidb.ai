import { rag } from '@/core/interface';
import { OpenAIEmbeddings } from '@langchain/openai';
import openaiEmbeddingsMeta, { type OpenaiEmbeddingsOptions } from './meta';

export default class OpenaiEmbeddings extends rag.Embeddings<OpenaiEmbeddingsOptions> {

  private readonly agent: OpenAIEmbeddings;

  constructor (options: OpenaiEmbeddingsOptions) {
    super(options);
    this.agent = new OpenAIEmbeddings(options.fields, options.configuration);
  }

  async embedChunks (chunks: string[]): Promise<rag.Vector[]> {
    const raw = await this.agent.embedDocuments(chunks);
    return raw.map(array => Float64Array.from(array));
  }

  async embedQuery (query: string): Promise<rag.Vector> {
    return Float64Array.from(await this.agent.embedQuery(query));
  }
}

Object.assign(OpenaiEmbeddings, openaiEmbeddingsMeta);
