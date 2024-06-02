import {observeLlamaindexLLM} from "@/lib/langfuse/llamaindex/llm";
import {LLMConfig, LLMProvider} from "@/lib/llamaindex/config/llm";
import {LangfuseTraceClient} from "langfuse";
import {OpenAI, Ollama} from "llamaindex";
import {Bitdeer} from "@/lib/llamaindex/llm/bitdeer";

export function buildLLM ({ provider, options}: LLMConfig, trace?: LangfuseTraceClient) {
  let baseLLM;
  switch (provider) {
    case LLMProvider.OPENAI:
      baseLLM = new OpenAI(options);
      break;
    case LLMProvider.BITDEER:
      baseLLM = new Bitdeer(options);
      break;
    case LLMProvider.OLLAMA:
      baseLLM = new Ollama(options ?? {
        model: "llama3",
      });
      break;
    default:
      throw new Error(`Unknown LLM provider: ${provider}`)
  }
  return observeLlamaindexLLM(baseLLM, trace);
}
