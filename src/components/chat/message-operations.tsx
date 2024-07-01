import { useMyChatContext } from '@/components/chat/context';
import { MessageFeedback } from '@/components/chat/message-feedback';
import type { ConversationMessageGroupProps } from '@/components/chat/use-grouped-conversation-messages';
import { useMessageFeedback } from '@/components/chat/use-message-feedback';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import copy from 'copy-to-clipboard';
import { ClipboardCheckIcon, ClipboardIcon, MessageSquareHeartIcon, MessageSquarePlusIcon, RefreshCwIcon } from 'lucide-react';
import { useState } from 'react';

export function MessageOperations ({ group }: { group: ConversationMessageGroupProps }) {
  const { handleRegenerate, id } = useMyChatContext();
  const { feedbackData, feedback: callFeedback, deleteFeedback: callDeleteFeedback, source, sourceLoading, disabled } = useMessageFeedback(id, group.assistantAnnotation.messageId, !!group.assistantAnnotation.traceURL);
  const [copied, setCopied] = useState(false);
  if (!group.finished) {
    return;
  }
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          className="gap-1 text-xs px-2 py-1 h-max"
          variant="ghost"
          onClick={() => handleRegenerate(group.assistantMessage.id)}
        >
          <RefreshCwIcon size="1em" />
          Regenerate
        </Button>

        <MessageFeedback
          initial={feedbackData}
          source={source} sourceLoading={sourceLoading} onFeedback={async (action, feedback, comment) => callFeedback(action, feedback, comment)} onDeleteFeedback={() => callDeleteFeedback()}>
          <Button size="icon" variant="ghost" className="ml-auto rounded-full w-7 h-7" disabled={disabled}>
            {feedbackData ? <MessageSquareHeartIcon className="w-4 h-4 text-green-500" /> : <MessageSquarePlusIcon className="w-4 h-4" />}
          </Button>
        </MessageFeedback>

        <Button
          size="icon"
          variant="ghost"
          className={cn('rounded-full w-7 h-7 transition-colors', copied && '!text-green-500 hover:bg-green-500/10')}
          onClick={() => {
            setCopied(copy(group.assistantMessage.content));
          }}
        >
          {copied
            ? <ClipboardCheckIcon className="w-4 h-4" />
            : <ClipboardIcon className="w-4 h-4" />}
        </Button>
      </div>
    </TooltipProvider>
  );
}