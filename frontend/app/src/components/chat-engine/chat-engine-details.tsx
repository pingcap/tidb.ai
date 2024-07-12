import type { ChatEngine } from '@/api/chat-engines';
import { ChatEngineOptionsDetails } from '@/components/chat-engine/chat-engine-options-details';
import { OptionDetail } from '@/components/option-detail';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

export function ChatEngineDetails ({ chatEngine }: { chatEngine: ChatEngine }) {
  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-2 text-sm">
        <OptionDetail title="ID" value={chatEngine.id} />
        <OptionDetail title="Created at" value={format(chatEngine.created_at, 'yyyy-MM-dd HH:mm:ss')} />
        <OptionDetail title="Updated at" value={format(chatEngine.updated_at, 'yyyy-MM-dd HH:mm:ss')} />
        <OptionDetail title="Is default" value={chatEngine.is_default ? 'Yes' : 'No'} />
      </div>
      <Separator />
      <ChatEngineOptionsDetails options={chatEngine.engine_options} />
    </div>
  );
}
