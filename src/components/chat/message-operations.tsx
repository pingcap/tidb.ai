import { useMyChatContext } from '@/components/chat/context';
import type { ConversationMessageGroupProps } from '@/components/chat/use-grouped-conversation-messages';
import { Button } from '@/components/ui/button';
import copy from 'copy-to-clipboard';
import { ClipboardIcon, RefreshCwIcon, ShareIcon, ThumbsDown } from 'lucide-react';

export function MessageOperations ({ group }: { group: ConversationMessageGroupProps }) {
  const { handleRegenerate } = useMyChatContext();
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
      <Button size="icon" variant="ghost" className="rounded-full w-7 h-7">
        <ClipboardIcon
          className="w-4 h-4"
          onClick={() => {
            copy(group.assistantMessage.content);
          }}
        />
      </Button>
    </div>
  );
}