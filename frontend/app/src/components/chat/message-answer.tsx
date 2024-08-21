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
        <img className="dark:hidden h-4" src="/answer-black.svg" alt="logo" />
        <img className="hidden dark:block h-4" src="/answer-white.svg" alt="logo" />
        Answer
      </div>
      <MessageContent message={message} />
    </>
  );
}