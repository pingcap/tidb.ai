import { useMyChatContext } from '@/components/chat/context';
import type { ConversationMessageGroupProps } from '@/components/chat/use-grouped-conversation-messages';
import { useMessageFeedback } from '@/components/chat/use-message-feedback';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import copy from 'copy-to-clipboard';
import { format } from 'date-fns';
import { ClipboardCheckIcon, ClipboardIcon, RefreshCwIcon, ShareIcon, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

export function MessageOperations ({ group }: { group: ConversationMessageGroupProps }) {
  const { handleRegenerate, id } = useMyChatContext();
  const { state, feedbackAt, like, disabled, dislike } = useMessageFeedback(id, group.assistantAnnotation.messageId, !!group.assistantAnnotation.traceURL);
  const [copied, setCopied] = useState(false);
  if (!group.finished) {
    return;
  }
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Button size="sm" className="gap-1 text-xs px-2 py-1 h-max" variant="ghost">
          <ShareIcon size="1em" />
          Share
        </Button>
        <Button
          size="sm"
          className="gap-1 text-xs px-2 py-1 h-max"
          variant="ghost"
          onClick={() => handleRegenerate(group.assistantMessage.id)}
        >
          <RefreshCwIcon size="1em" />
          Regenerate
        </Button>
        {state == null && (
          <>
            <Button size="icon" variant="ghost" className="ml-auto rounded-full w-7 h-7" disabled={disabled} onClick={like}>
              <ThumbsUp className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full w-7 h-7" disabled={disabled} onClick={dislike}>
              <ThumbsDown className="w-4 h-4" />
            </Button>
          </>
        )}
        {state === 'like' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="ml-auto rounded-full w-7 h-7 p-1.5">
                <ThumbsUp className="w-4 h-4 fill-current" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              You like this answer at <time>{feedbackAt ? format(feedbackAt, 'yyyy-MM-dd') : 'N/A'}</time>
            </TooltipContent>
          </Tooltip>
        )}
        {state === 'dislike' && (
          <Tooltip>
            <TooltipTrigger>
              <span className="ml-auto rounded-full w-7 h-7 p-1.5">
                <ThumbsDown className="w-4 h-4 fill-current" />
              </span>
              <TooltipContent>
                You dislike this answer at <time>{feedbackAt ? format(feedbackAt, 'yyyy-MM-dd') : 'N/A'}</time>
              </TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        )}
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