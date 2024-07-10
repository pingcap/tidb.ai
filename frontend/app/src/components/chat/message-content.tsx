import type { ChatMessage } from '@/api/chats';
import { RemarkContent } from '@/components/remark-content';
import '@/components/chat/style.css';

export function MessageContent ({ message }: { message: ChatMessage }) {
  return (
    <article className="remark-content prose prose-sm prose-neutral dark:prose-invert overflow-x-hidden break-words max-w-[unset]">
      <RemarkContent>
        {message.content}
      </RemarkContent>
    </article>
  );
}