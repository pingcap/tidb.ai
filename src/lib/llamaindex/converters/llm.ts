import { rag } from '@/core/interface';
import { type LLM, OpenAI } from 'llamaindex';

export function fromAppChatModel (r: rag.ChatModel<any>): LLM {
  if (r.identifier === rag.ExtensionType.ChatModel + '.openai') {
    return new OpenAI({
      apiKey: (r.options as any).apiKey,
      model: (r.options as any).model,
    });
  }
  throw new Error(`${r.identifier} not supported in llamaindex env yet`);
}
