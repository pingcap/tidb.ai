import type { ChatEngine, ChatEngineOptions } from '@/api/chat-engines';
import { ChatEngineKnowledgeGraphDetails } from '@/components/chat-engine/knowledge-graph-details';
import { ChatEngineLLMDetails } from '@/components/chat-engine/llm-details';
import { Separator } from '@/components/ui/separator';

export function ChatEngineOptionsDetails ({
  detailed = true,
  editable,
  options,
}: {
  detailed?: boolean
  editable?: ChatEngine
  options: ChatEngineOptions
}) {
  return (
    <>
      <section className="space-y-2">
        <div className="text-base font-medium">Knowledge Graph</div>
        <div className="space-y-2 text-sm">
          <ChatEngineKnowledgeGraphDetails detailed={detailed} editable={editable} options={options.knowledge_graph} />
        </div>
      </section>
      <Separator />
      <section className="space-y-2">
        <div className="text-base font-medium">LLM</div>
        <div className="space-y-2 text-sm">
          <ChatEngineLLMDetails editable={editable} options={options.llm} />
        </div>
      </section>
    </>
  );
}