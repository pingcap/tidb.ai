import type { ChatEngine, ChatEngineOptions } from '@/api/chat-engines';
import { EditBooleanForm } from '@/components/chat-engine/edit-boolean-form';
import { EditOptionBooleanForm } from '@/components/chat-engine/edit-option-boolean-form';
import { EditTokenForm } from '@/components/chat-engine/edit-token-form';
import { EditUrlForm } from '@/components/chat-engine/edit-url-form';
import { ChatEngineKnowledgeGraphDetails } from '@/components/chat-engine/knowledge-graph-details';
import { ChatEngineLLMDetails } from '@/components/chat-engine/llm-details';
import { OptionDetail } from '@/components/option-detail';
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
        <ChatEngineKnowledgeGraphDetails detailed={detailed} editable={editable} options={options.knowledge_graph} />
      </section>
      <Separator />
      <section className="space-y-2">
        <div className="text-base font-medium">LLM</div>
        <ChatEngineLLMDetails editable={editable} options={options.llm} />
      </section>
      <Separator />
      <section className="space-y-2">
        <div className="text-base font-medium">UI</div>
        <div className="space-y-2 text-sm">
          <OptionDetail title="Hide Sources" value={options.hide_sources ? 'Enabled' : 'Disabled'} valueClassName={options.hide_sources ? 'text-green-500' : 'text-muted-foreground'} editPanel={editable && <EditOptionBooleanForm chatEngine={editable} property="hide_sources" />} />
        </div>
      </section>
      <Separator />
      <section className="space-y-2">
        <div className="text-base font-medium">Post Verification</div>
        <div className="space-y-2 text-sm">
          <OptionDetail title="Post Validation URL" value={options.post_verification_url} editPanel={editable && <EditUrlForm chatEngine={editable} property="post_verification_url" />} />
          {editable && <OptionDetail title="Post Validation Token" value="[HIDDEN]" editPanel={editable && <EditTokenForm chatEngine={editable} property="post_verification_token" />} />}
        </div>
      </section>
    </>
  );
}