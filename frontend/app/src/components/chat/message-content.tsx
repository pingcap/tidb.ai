import { useChatMessageField } from '@/components/chat/chat-hooks';
import { ChatMessageController } from '@/components/chat/chat-message-controller';
import { RemarkContent } from '@/components/remark-content';
import '@/components/chat/style.css';

export function MessageContent ({ message }: { message: ChatMessageController | undefined }) {
  const content = useChatMessageField(message, 'content') ?? '';
  return (
    <article className="remark-content prose prose-sm prose-neutral dark:prose-invert overflow-x-hidden break-words max-w-[unset]">
      <RemarkContent>
        {content}
      </RemarkContent>
    </article>
  );
}