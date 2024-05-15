import {isAsyncIterable} from "@/lib/async";
import {LangfuseTraceClient} from "langfuse";
import {BaseLLM} from "llamaindex/llm/base";
import {
  LLMChatParamsNonStreaming,
  LLMChatParamsStreaming,
  LLMCompletionParamsNonStreaming,
  LLMCompletionParamsStreaming
} from "llamaindex/llm/types";

export function observeLlamaindexLLM<LLM extends BaseLLM>(baseLLM: LLM, trace?: LangfuseTraceClient): LLM {
  return new Proxy(baseLLM, {
    get(target, prop, receiver) {
      const originalMethod = Reflect.get(target, prop, receiver);

      if (typeof originalMethod !== 'function') {
        return originalMethod;
      } else if (!(['complete', 'chat'] as any[]).includes(prop)) {
        return originalMethod;
      }

      if (prop === 'complete') {
        return async function (params: LLMCompletionParamsStreaming | LLMCompletionParamsNonStreaming) {
          const generation = trace?.generation({
            model: target.metadata.model,
            input: params.prompt,
            metadata: target.metadata,
          });

          const res = await (originalMethod.apply(target, [params]) as Promise<any>);
          if (isAsyncIterable(res)) {
            async function* tracedOutputGenerator(): AsyncGenerator<unknown, void, unknown> {
              const response = res;
              const processedChunks: string[] = [];
              let completionStartTime: Date | null = null;

              for await (const rawChunk of response as AsyncIterable<any>) {
                completionStartTime = completionStartTime ?? new Date();
                processedChunks.push(rawChunk.text as any);
                yield rawChunk;
              }

              generation?.end({
                output: processedChunks.join(''),
                completionStartTime,
              });
            }

            return tracedOutputGenerator();
          } else {
            generation?.end({
              model: res.raw.model,
              output: res.text,
              usage: res.raw.usage
            });
            return res;
          }
        }
      } else if (prop === 'chat') {
        return async function (params: LLMChatParamsStreaming | LLMChatParamsNonStreaming) {
          const generation = trace?.generation({
            model: target.metadata.model,
            input: params.messages,
            metadata: {
              ...target.metadata,
              ...params.additionalChatOptions
            }
          });

          const res = await (originalMethod.apply(target, [params]) as Promise<any>);

          if (isAsyncIterable(res)) {
            async function* tracedOutputGenerator(): AsyncGenerator<unknown, void, unknown> {
              const response = res;
              const processedChunks: string[] = [];
              const extra = {
                role: 'assistant',
                options: {}
              };
              let completionStartTime: Date | null = null;

              for await (const rawChunk of response as AsyncIterable<any>) {
                completionStartTime = completionStartTime ?? new Date();
                const { content, role, options } = rawChunk.message;
                processedChunks.push(content);
                extra.role = role;
                extra.options = options;
                yield rawChunk;
              }

              generation?.end({
                output: {
                  content: JSON.stringify(processedChunks),
                  ...extra
                },
                completionStartTime,
              });
            }

            return tracedOutputGenerator();
          } else {
            generation?.end({
              model: res.raw.model,
              output: res.message,
              usage: res.raw.usage
            });
            return res;
          }
        }
      }

      return originalMethod;
    }
  });
}

