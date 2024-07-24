import type { ChatEngine } from '@/api/chat-engines';
import { ChatEngineOptionsDetails } from '@/components/chat-engine/chat-engine-options-details';
import { EditIsDefaultForm } from '@/components/chat-engine/edit-is-default-form';
import { EditLlmForm } from '@/components/chat-engine/edit-llm-form';
import { EditNameForm } from '@/components/chat-engine/edit-name-form';
import { LlmInfo } from '@/components/llm/LlmInfo';
import { OptionDetail } from '@/components/option-detail';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

export function ChatEngineDetails ({ chatEngine }: { chatEngine: ChatEngine }) {
  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-2 text-sm">
        <OptionDetail title="ID" value={chatEngine.id} />
        <OptionDetail title="Name" value={chatEngine.name} editPanel={<EditNameForm chatEngine={chatEngine} />} />
        <OptionDetail title="LLM" value={<LlmInfo id={chatEngine.llm_id} />} editPanel={<EditLlmForm chatEngine={chatEngine} type="llm" />} />
        <OptionDetail title="Fast LLM" value={<LlmInfo id={chatEngine.fast_llm_id} />} editPanel={<EditLlmForm chatEngine={chatEngine} type="fast_llm" />} />
        <OptionDetail title="Created at" value={format(chatEngine.created_at, 'yyyy-MM-dd HH:mm:ss')} />
        <OptionDetail title="Updated at" value={format(chatEngine.updated_at, 'yyyy-MM-dd HH:mm:ss')} />
        <OptionDetail title="Is default" value={chatEngine.is_default ? 'Yes' : 'No'} editPanel={<EditIsDefaultForm chatEngine={chatEngine} />} />
      </div>
      <Separator />
      <ChatEngineOptionsDetails options={chatEngine.engine_options} editable={chatEngine} />
    </div>
  );
}
