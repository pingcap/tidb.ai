import type { MyConversationMessageGroup } from '@/components/chat/use-grouped-conversation-messages';
import { RemarkContent } from '@/components/remark-content';
import '@/components/chat/style.css';

export function MessageContent ({ group }: { group: MyConversationMessageGroup }) {
  return (
    <article className="remark-content prose prose-sm prose-neutral dark:prose-invert overflow-x-hidden break-words max-w-[unset]">
      <RemarkContent>
        {group.assistantMessage.content}
      </RemarkContent>
    </article>
  );
}