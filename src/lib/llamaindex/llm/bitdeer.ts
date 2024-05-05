import {getEnv} from "@/lib/env";
import {
  ChatResponse,
  ChatResponseChunk,
  CompletionResponse,
  LLMChatParamsNonStreaming,
  LLMChatParamsStreaming,
  LLMCompletionParamsNonStreaming,
  LLMCompletionParamsStreaming,
  LLMMetadata
} from "llamaindex";
import {BaseLLM} from "llamaindex/llm/base";
import {ok} from "node:assert";
import * as util from "node:util";

const messageAccessor = (data: any): ChatResponseChunk => {
  return {
    raw: null,
    delta: data.message.content,
  };
};

const completionAccessor = (data: any): CompletionResponse => {
  return {
    raw: null,
    text: data.response
  };
};

export type BitdeerModel = "llama2" | "mistral";

export interface BitdeerAdditionalChatOptions extends Record<string, unknown> {
  mirostat: number;
  mirostat_eta: number;
  mirostat_tau: number;
  num_ctx: number;
  repeat_last_n: number;
  repeat_penalty: number;
  temperature: number;
  num_predict: number;
  seed: number;
  tfs_z: number;
  top_k: number;
  top_p: number;
}

export const defaultChatOptions = {
  mirostat: 0,
  mirostat_eta:  0.1,
  mirostat_tau: 5,
  num_ctx: 2048,
  repeat_last_n: 64,
  repeat_penalty: 1.1,
  temperature: 0,
  num_predict: -1,
  seed: 42,
  tfs_z: 1,
  top_k: 40,
  top_p: 0.9
};

/**
 * Bitdeer is a cloud computing platform that provides computing power for cryptocurrency mining.
 *
 * In the AI age, Bitdeer also provides managed AI models (For example, llama2, mistral, etc.) services.
 *
 * Website: https://www.bitdeer.com/
 */
export class Bitdeer implements BaseLLM<BitdeerAdditionalChatOptions> {
  model: string = "mistral";
  baseURL: string = "https://www.bitdeer.ai/public/v1";
  temperature: number = 0;
  topP: number = 0.9;
  contextWindow: number = 2048;
  requestTimeout: number = 60 * 1000; // Default is 60 seconds
  additionalChatOptions?: BitdeerAdditionalChatOptions = defaultChatOptions;

  private apiSecretAccessKey: string = getEnv("BITDEER_API_SECRET_ACCESS_KEY");

  protected modelMetadata: Partial<LLMMetadata> = {};

  constructor(
    init?: Partial<Bitdeer> & {
      // model is required
      model?: BitdeerModel;
      modelMetadata?: Partial<LLMMetadata>;
      apiSecretAccessKey?: string;
    },
  ) {
    Object.assign(this, init);
    if (!this.apiSecretAccessKey) {
      throw new Error("BITDEER_API_SECRET_ACCESS_KEY is required.");
    }
  }

  get metadata(): LLMMetadata {
    return {
      model: this.model,
      temperature: this.temperature,
      topP: this.topP,
      maxTokens: undefined,
      contextWindow: this.contextWindow,
      tokenizer: undefined,
      ...this.modelMetadata,
    };
  }

  chat(
    params: LLMChatParamsStreaming,
  ): Promise<AsyncIterable<ChatResponseChunk>>;
  chat(params: LLMChatParamsNonStreaming): Promise<ChatResponse>;
  async chat(
    params: LLMChatParamsNonStreaming | LLMChatParamsStreaming,
  ): Promise<ChatResponse | AsyncIterable<ChatResponseChunk>> {
    const { messages, stream } = params;

    let payload = {
      model: this.model,
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      // Notice: Bitdeer chat completion API does not support streaming mode.
      stream: false,
      options: {
        temperature: this.temperature,
        num_ctx: this.contextWindow,
        top_p: this.topP,
        ...this.additionalChatOptions,
      },
    };

    const url = `${this.baseURL}/models/${this.model}/generate`;
    const res = await fetch(url, {
      body: JSON.stringify(payload),
      method: "POST",
      signal: AbortSignal.timeout(this.requestTimeout),
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiSecretAccessKey,
      },
    });

    if (!res.ok) {
      throw new Error(util.format(
        'Failed to call Bitdeer chat completion API (status: %d, statusText: %s, stream: %s).',
        res.status,
        res.statusText,
        stream
      ));
    }

    if (!stream) {
      const raw = await res.json();
      const { message } = raw.data;
      return {
        message: {
          role: "assistant",
          content: message.content,
        },
        raw,
      };
    } else {
      const stream = this.mockResponseStream(async () => {
        const raw = await res.json();
        return {
          message: raw.data.message
        };
      });

      ok(stream, "stream is null");
      ok(stream instanceof ReadableStream, "stream is not readable");

      return this.streamChat(stream, messageAccessor);
    }
  }

  private async *streamChat<T>(
    stream: ReadableStream<Uint8Array>,
    accessor: (data: any) => T,
  ): AsyncIterable<T> {
    const reader = stream.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      const lines = Buffer.from(value)
        .toString("utf-8")
        .split("\n")
        .map((line) => line.trim());
      for (const line of lines) {
        if (line === "") {
          continue;
        }
        const json = JSON.parse(line);
        if (json.error) {
          throw new Error(json.error);
        }
        yield accessor(json);
      }
    }
  }

  private mockResponseStream(getResponse: () => Promise<any>) {
    return new ReadableStream({
      async pull(controller) {
        controller.enqueue(Buffer.from(JSON.stringify(await getResponse())));
        controller.close();
      }
    });
  }

  complete(
    params: LLMCompletionParamsStreaming
  ): Promise<AsyncIterable<CompletionResponse>>;
  complete(
    params: LLMCompletionParamsNonStreaming
  ): Promise<CompletionResponse>;
  async complete(
    params: LLMCompletionParamsStreaming | LLMCompletionParamsNonStreaming,
  ): Promise<CompletionResponse | AsyncIterable<CompletionResponse>> {
    const { prompt, stream } = params;

    const payload = {
      model: this.model,
      prompt: prompt,
      stream: !!stream,
      options: {
        temperature: this.temperature,
        num_ctx: this.contextWindow,
        top_p: this.topP,
        ...this.additionalChatOptions,
      },
    };
    const url = `${this.baseURL}/models/${this.model}/generate`;
    const res = await fetch(url, {
      body: JSON.stringify(payload),
      method: "POST",
      signal: AbortSignal.timeout(this.requestTimeout),
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiSecretAccessKey,
      },
    });

    if (!res.ok) {
      throw new Error(util.format(
        'Failed to call Bitdeer completion API (status: %d, statusText: %s).',
        res.status,
        res.statusText
      ));
    }

    if (!stream) {
      const raw = await res.json();
      return {
        text: raw.data.response,
        raw,
      };
    } else {
      const stream = this.mockResponseStream(async () => {
        const raw = await res.json();
        return {
          response: raw.data.response
        };
      });

      ok(stream, "stream is null");
      ok(stream instanceof ReadableStream, "stream is not readable");

      return this.streamChat(stream, completionAccessor);
    }
  }

}
