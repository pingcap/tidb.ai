import {LLMConfig, LLMProvider} from "@/lib/llamaindex/config/llm";
import {OpenAI, Ollama} from "llamaindex";
import {Bitdeer} from "@/lib/llamaindex/llm/bitdeer";

export async function buildLLM ({ provider, options}: LLMConfig) {
  switch (provider) {
    case LLMProvider.OPENAI:
      return new OpenAI(options);
    case LLMProvider.BITDEER:
      return new Bitdeer(options);
    case LLMProvider.OLLAMA:
      return new Ollama(options ?? {
        model: "llama3",
      });
    default:
      throw new Error(`Unknown LLM provider: ${provider}`)
  }
}
