import type { ChatEngine } from '@/api/chat-engines';
import { ChatEngineOptionsDetails } from '@/components/chat-engine/chat-engine-options-details';
import { EditBooleanForm } from '@/components/chat-engine/edit-boolean-form';
import { EditLlmForm } from '@/components/chat-engine/edit-llm-form';
import { EditNameForm } from '@/components/chat-engine/edit-name-form';
import { EditRerankerForm } from '@/components/chat-engine/edit-reranker-form';
import { LlmInfo } from '@/components/llm/LlmInfo';
import { OptionDetail } from '@/components/option-detail';
import { RerankerInfo } from '@/components/reranker/RerankerInfo';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

export function ChatEngineDetails ({ chatEngine }: { chatEngine: ChatEngine }) {
  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-2 text-sm">
        <OptionDetail title="ID" value={chatEngine.id} />
        <OptionDetail title="Name" value={chatEngine.name} editPanel={<EditNameForm chatEngine={chatEngine} />} />
        <OptionDetail title="LLM" value={<LlmInfo id={chatEngine.llm_id} />} editPanel={<EditLlmForm chatEngine={chatEngine} type="llm_id" />} />
        <OptionDetail title="Fast LLM" value={<LlmInfo id={chatEngine.fast_llm_id} />} editPanel={<EditLlmForm chatEngine={chatEngine} type="fast_llm_id" />} />
        <OptionDetail title="Reranker Model" value={<RerankerInfo id={chatEngine.reranker_id} />} editPanel={<EditRerankerForm chatEngine={chatEngine} />} />
        <OptionDetail title="Created at" value={format(chatEngine.created_at, 'yyyy-MM-dd HH:mm:ss')} />
        <OptionDetail title="Updated at" value={format(chatEngine.updated_at, 'yyyy-MM-dd HH:mm:ss')} />
        <OptionDetail title="Is default" value={chatEngine.is_default ? 'Yes' : 'No'} editPanel={<EditBooleanForm type="is_default" chatEngine={chatEngine} />} />
      </div>
      <Separator />
      <ChatEngineOptionsDetails options={chatEngine.engine_options} editable={chatEngine} />
    </div>
  );
}
