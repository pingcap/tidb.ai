import {BaseLLM} from "llamaindex/llm/base";
import {ok} from "node:assert";
import {
  ChatResponse,
  ChatResponseChunk,
  CompletionResponse,
  LLMChatParamsNonStreaming,
  LLMChatParamsStreaming, LLMCompletionParamsNonStreaming, LLMCompletionParamsStreaming,
  LLMMetadata
} from "llamaindex";
import * as util from "node:util";

// FIXME
const messageAccessor = (data: any): ChatResponseChunk => {
  return {
    delta: data.message.content,
  } as never;
};

// FIXME
const completionAccessor = (data: any): CompletionResponse => {
  return { text: data.response } as never;
};

export type BitdeerModel = "llama2" | "mistral";

export interface BitdeerLlama2Options extends Record<string, unknown> {
  microstat: number;
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

export type BitdeerAdditionalChatOptions = BitdeerLlama2Options;

/**
 * Bitdeer is a cloud computing platform that provides computing power for cryptocurrency mining.
 *
 * In the AI age, Bitdeer also provides managed AI models (For example, llama2, mistral, etc.) services.
 *
 * Website: https://www.bitdeer.com/
 */
export class Bitdeer implements BaseLLM<BitdeerAdditionalChatOptions> {
  readonly hasStreaming = false;

  model: string;
  baseURL: string = "https://www.bitdeer.ai/public/v1";
  temperature: number = 0.7;
  topP: number = 0.9;
  contextWindow: number = 4096;
  requestTimeout: number = 60 * 1000; // Default is 60 seconds
  additionalChatOptions?: BitdeerAdditionalChatOptions;

  private apiSecretAccessKey: string;

  protected modelMetadata: Partial<LLMMetadata>;

  constructor(
    init: Partial<Bitdeer> & {
      // model is required
      model: BitdeerModel;
      modelMetadata?: Partial<LLMMetadata>;
      apiSecretAccessKey: string;
    },
  ) {
    if (!init.apiSecretAccessKey) {
      throw new Error("Bitdeer API secret access key is required.");
    }

    this.model = init.model ?? 'llama2';
    this.modelMetadata = init.modelMetadata ?? {};
    this.apiSecretAccessKey = init.apiSecretAccessKey;
    Object.assign(this, init);
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
    const payload = {
      model: this.model,
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      stream: !!stream,
      options: {
        temperature: this.temperature,
        num_ctx: this.contextWindow,
        top_p: this.topP,
        ...this.additionalChatOptions,
      },
    };

    const url = `${this.baseURL}/models/${this.model}/generate`;
    const response = await fetch(url, {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiSecretAccessKey,
      },
    });
    if (!stream) {
      if (!response.ok) {
        throw new Error(util.format(
          'Failed to call Bitdeer chat completion API (status: %d, statusText: %s).',
          response.status,
          response.statusText
        ));
      }

      const raw = await response.json();
      const { message } = raw.data;
      return {
        message: {
          role: "assistant",
          content: message.content,
        },
        raw,
      };
    } else {
      const stream = response.body;
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

  complete(
    params: LLMCompletionParamsStreaming,
  ): Promise<AsyncIterable<CompletionResponse>>;
  complete(
    params: LLMCompletionParamsNonStreaming,
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
    const response = await fetch(url, {
      body: JSON.stringify(payload),
      method: "POST",
      // signal: AbortSignal.timeout(this.requestTimeout),
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiSecretAccessKey,
      },
    });

    if (!stream) {
      if (!response.ok) {
        throw new Error(util.format(
          'Failed to call Bitdeer completion API (status: %d, statusText: %s).',
          response.status,
          response.statusText
        ));
      }
      const raw = await response.json();
      return {
        text: raw.data.response,
        raw,
      };
    } else {
      const stream = response.body;
      ok(stream, "stream is null");
      ok(stream instanceof ReadableStream, "stream is not readable");
      return this.streamChat(stream, completionAccessor);
    }
  }

}
