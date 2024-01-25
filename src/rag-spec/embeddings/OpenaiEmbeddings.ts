import { rag } from '@/core/interface';
import { env } from '@/lib/zod-extensions';
import { OpenAIEmbeddings } from '@langchain/openai';
import { z } from 'zod';

namespace OpenaiEmbeddings {
  export interface Options {
    fields?: ConstructorParameters<typeof OpenAIEmbeddings>[0];
    configuration?: ConstructorParameters<typeof OpenAIEmbeddings>[1];
  }
}

export class OpenaiEmbeddings extends rag.Embeddings<OpenaiEmbeddings.Options> {
  static identifier = 'rag.embeddings.openai';
  static displayName = 'OpenAI Embeddings';
  static options = z.object({
    fields: z.object({
      openAIApiKey: env('OPENAI_API_KEY'),
    }),
  });

  private readonly agent: OpenAIEmbeddings;

  constructor (options: OpenaiEmbeddings.Options) {
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