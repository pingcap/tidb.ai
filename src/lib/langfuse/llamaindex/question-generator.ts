import {LangfuseTraceClient} from "langfuse";
import {BaseQuestionGenerator} from "llamaindex/engines/query/types";
import type {ToolMetadata} from "llamaindex/types";

export function observeQuestionGenerator<LLM extends BaseQuestionGenerator>(baseLLM: LLM, trace?: LangfuseTraceClient): LLM {
  return new Proxy(baseLLM, {
    get(target, prop, receiver) {
      const originalMethod = Reflect.get(target, prop, receiver);

      if (typeof originalMethod !== 'function') {
        return originalMethod;
      } else if (!(['generate'] as any[]).includes(prop)) {
        return originalMethod;
      }

      if (prop === 'generate') {
        return async function (tools: ToolMetadata[], query: string) {
          const span = trace?.span({
            name: 'generate-question',
            input: query,
            metadata: tools
          });

          const res = await (originalMethod.apply(target, [tools, query]) as Promise<any>);

          span?.end({
            output: res,
          });

          return res;
        }
      }

      return originalMethod;
    }
  });
}

