import { useChatMessageField } from '@/components/chat/chat-hooks';
import { ChatMessageController } from '@/components/chat/chat-message-controller';
import { RemarkContent } from '@/components/remark-content';
import '@/components/chat/style.css';

export function MessageContent ({ message }: { message: ChatMessageController | undefined }) {
  const content = useChatMessageField(message, 'content') ?? '';
  return (
    <article className="remark-content prose prose-sm prose-neutral prose-pre:bg-zinc-50 dark:prose-pre:bg-zinc-900 prose-pre:text-accent-foreground dark:prose-invert overflow-x-hidden break-words max-w-[unset]" style={{ minWidth: 400 }}>
      <RemarkContent>
        {content}
      </RemarkContent>
    </article>
  );
}