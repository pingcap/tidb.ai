import { useMyChatContext } from '@/components/chat/context';
import type { ConversationMessageGroupProps } from '@/components/chat/use-grouped-conversation-messages';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import copy from 'copy-to-clipboard';
import { ClipboardCheckIcon, ClipboardIcon, RefreshCwIcon, ShareIcon, ThumbsDown } from 'lucide-react';
import { useState } from 'react';

export function MessageOperations ({ group }: { group: ConversationMessageGroupProps }) {
  const { handleRegenerate } = useMyChatContext();
  const [copied, setCopied] = useState(false);
  if (!group.finished) {
    return;
  }
  return (
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
      <Button size="icon" variant="ghost" className="ml-auto rounded-full w-7 h-7">
        <ThumbsDown className="w-4 h-4" />
      </Button>
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
  );
}