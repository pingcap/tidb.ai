import { useChatMessageField, useChatMessageStreamContainsState } from '@/components/chat/chat-hooks';
import type { ChatMessageController } from '@/components/chat/chat-message-controller';
import { AppChatStreamState } from '@/components/chat/chat-stream-state';
import { MessageContent } from '@/components/chat/message-content';

export function MessageAnswer ({ message }: { message: ChatMessageController | undefined }) {
  const content = useChatMessageField(message, 'content');
  const shouldShow = useChatMessageStreamContainsState(message, AppChatStreamState.GENERATE_ANSWER);

  if (!shouldShow && !content?.length) {
    return null;
  }

  return (
    <>
      <div className="font-normal text-lg flex items-center gap-2">
        <svg className="dark:hidden size-4" viewBox="0 0 745 745" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="721" height="721" rx="108" stroke="#212121" stroke-width="24" />
          <rect x="298" y="172" width="150" height="150" rx="24" fill="#212121" />
          <rect x="298" y="422" width="150" height="150" rx="24" fill="#212121" />
        </svg>
        <svg className="hidden dark:block size-4" viewBox="0 0 745 745" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="721" height="721" rx="108" stroke="white" stroke-width="24" />
          <rect x="298" y="172" width="150" height="150" rx="24" fill="white" />
          <rect x="298" y="422" width="150" height="150" rx="24" fill="white" />
        </svg>
        Answer
      </div>
      <MessageContent message={message} />
    </>
  );
}