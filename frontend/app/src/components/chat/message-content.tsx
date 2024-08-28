import { useChatMessageField } from '@/components/chat/chat-hooks';
import { ChatMessageController } from '@/components/chat/chat-message-controller';
import { RemarkContent } from '@/components/remark-content';

export function MessageContent ({ message }: { message: ChatMessageController | undefined }) {
  const content = useChatMessageField(message, 'content') ?? '';
  return (
    <RemarkContent>
      {content}
    </RemarkContent>
  );
}
