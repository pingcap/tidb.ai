import type { OngoingConversationMessageGroup } from '@/components/chat/use-grouped-conversation-messages';
import { LoaderIcon } from 'lucide-react';

export function MessageAnnotation ({ group }: { group: OngoingConversationMessageGroup }) {
  let text: string | undefined = group.assistantMessage.display;

  return (
    <div className="text-muted-foreground leading-tight">
      <LoaderIcon className="inline-block animate-spin w-4 h-4 mr-2" />
      <span className="text-xs">{text}</span>
    </div>
  );
}
