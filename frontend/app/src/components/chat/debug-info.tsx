import { ChatEngineOptionsDetails } from '@/components/chat-engine/chat-engine-options-details';
import { type ChatMessageGroup, useChatInfo, useChatMessageField, useCurrentChatController } from '@/components/chat/chat-hooks';
import { KnowledgeGraphDebugInfo } from '@/components/chat/knowledge-graph-debug-info';
import { DateFormat } from '@/components/date-format';
import { OptionDetail } from '@/components/option-detail';
// import { MessageLangfuse } from '@/components/chat/message-langfuse';
import { Separator } from '@/components/ui/separator';
import { differenceInSeconds } from 'date-fns';
import { WorkflowIcon } from 'lucide-react';
import 'react-json-view-lite/dist/index.css';

export interface DebugInfoProps {
  group: ChatMessageGroup;
}

export function DebugInfo ({ group }: DebugInfoProps) {
  const chat = useChatInfo(useCurrentChatController());
  const traceURL = useChatMessageField(group.assistant, 'trace_url');
  const createdAt = useChatMessageField(group.assistant, 'created_at');
  const finishedAt = useChatMessageField(group.assistant, 'finished_at');

  return (
    <div className="my-2 p-4 space-y-4 bg-card border rounded text-xs">
      {traceURL && <div className="flex items-center gap-4 text-xs flex-wrap">
        <a className="underline" target="_blank" href={traceURL}>
          <WorkflowIcon className="inline w-3 h-3 mr-1" />
          Langfuse Tracing
        </a>
      </div>}
      {/*<MessageLangfuse group={group} />*/}
      <KnowledgeGraphDebugInfo group={group} />
      {chat && (
        <section className="space-y-2">
          <div className="space-y-2 text-sm">
            <div className="space-y-2 text-sm">
              <OptionDetail title="Chat Created At" value={<DateFormat date={chat.created_at} />} />
              <OptionDetail title="Message Created At" value={<DateFormat date={createdAt} />} />
              <OptionDetail title="Message Finished In" value={(createdAt && finishedAt) && `${differenceInSeconds(finishedAt, createdAt)} seconds`} />
            </div>
          </div>
        </section>
      )}
      <Separator />
      {chat?.engine_options && (
        <div className="space-y-4">
          <ChatEngineOptionsDetails detailed={false} options={chat.engine_options} />
        </div>
      )}
    </div>
  );
}
