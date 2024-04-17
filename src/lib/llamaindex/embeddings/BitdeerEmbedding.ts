import {getEnv} from "@llamaindex/env";
import {BaseEmbedding} from "llamaindex";
import util from "node:util";

export enum BitdeerEmbeddingModelType {
  MISTRAL_EMBED_LARGE = "mxbai-embed-large",
}

export class BitdeerEmbedding extends BaseEmbedding {
  baseURL: string = "https://www.bitdeer.ai/public/v1";
  model: BitdeerEmbeddingModelType = BitdeerEmbeddingModelType.MISTRAL_EMBED_LARGE;

  apiSecretAccessKey?: string = getEnv("BITDEER_API_SECRET_ACCESS_KEY");
  requestTimeout: number = 60 * 1000; // Default is 60 seconds

  constructor(init?: Partial<BitdeerEmbedding>) {
    super();
    Object.assign(this, init);
    if (!this.apiSecretAccessKey) {
      throw new Error("BITDEER_API_SECRET_ACCESS_KEY is required.");
    }
  }

  private async getBitdeerEmbedding(input: string) {
    const payload = {
      model: this.model,
      prompt: input
    };
    const url = `${this.baseURL}/models/${this.model}/generate`;
    const response = await fetch(url, {
      body: JSON.stringify(payload),
      method: "POST",
      signal: AbortSignal.timeout(this.requestTimeout),
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiSecretAccessKey!,
      },
    });

    if (!response.ok) {
      throw new Error(util.format(
        'Failed to call Bitdeer embedding API (status: %d, statusText: %s).',
        response.status,
        response.statusText
      ));
    }

    const raw = await response.json();
    return raw.data.embedding;
  }

  async getTextEmbedding(text: string): Promise<number[]> {
    return this.getBitdeerEmbedding(text);
  }

  async getQueryEmbedding(query: string): Promise<number[]> {
    return this.getBitdeerEmbedding(query);
  }
}
