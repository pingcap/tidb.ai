import { ChatEngineOptionsDetails } from '@/components/chat-engine/chat-engine-options-details';
import { type ChatMessageGroup, useChatInfo, useChatMessageField, useCurrentChatController } from '@/components/chat/chat-hooks';
import { KnowledgeGraphDebugInfo } from '@/components/chat/knowledge-graph-debug-info';
// import { MessageLangfuse } from '@/components/chat/message-langfuse';
import { Dialog, DialogContent, DialogHeader, DialogPortal, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WorkflowIcon } from 'lucide-react';
import 'react-json-view-lite/dist/index.css';

export interface DebugInfoProps {
  group: ChatMessageGroup;
}

export function DebugInfo ({ group }: DebugInfoProps) {
  const { engine_options: chatEngineOptions } = useChatInfo(useCurrentChatController()) ?? {};
  const traceURL = useChatMessageField(group.assistant, 'trace_url');

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
      {chatEngineOptions && (
        <div className="space-y-4">
          <ChatEngineOptionsDetails detailed={false} options={chatEngineOptions} />
        </div>
      )}
    </div>
  );
}

interface PromptDialogProps {
  title: string;
  prompt: string;
}

function PromptDialog ({ title, prompt }: PromptDialogProps) {
  return (
    <li>
      <Dialog>
        <DialogTrigger asChild>
          <button className="cursor-pointer underline">
            {title}
          </button>
        </DialogTrigger>
        <DialogPortal>
          <DialogContent>
            <DialogHeader>Prompt: {title}</DialogHeader>
            <ScrollArea className="h-72">
              <pre className="text-xs whitespace-pre-wrap">{prompt}</pre>
            </ScrollArea>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </li>
  );
}
