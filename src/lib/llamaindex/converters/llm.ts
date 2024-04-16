import { Flow } from '@/core';
import { rag } from '@/core/interface';
import {Bitdeer} from "@/lib/llamaindex/llm/bitdeer";
import { type LLM, OpenAI } from 'llamaindex';
import ExtensionType = rag.ExtensionType;

export function getLLM (flow: Flow, provider: string, config: any) {
  if (provider === 'openai' || provider === rag.ExtensionType.ChatModel + '.openai') {
    return new OpenAI(config);
  } else if (provider === 'bitdeer' || provider === rag.ExtensionType.ChatModel + '.bitdeer') {
    return new Bitdeer(config);
  }

  return fromAppChatModel(flow.getRequired(ExtensionType.ChatModel, provider).withOptions(config));
}

export function fromAppChatModel (r: rag.ChatModel<any>): LLM {
  if (r.identifier === rag.ExtensionType.ChatModel + '.openai') {
    return new OpenAI({
      apiKey: (r.options as any).apiKey,
      model: (r.options as any).model,
    });
  }
  throw new Error(`${r.identifier} not supported in llamaindex env yet`);
}
