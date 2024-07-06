import type { ChatMessage } from '@/api/chats';
import { AppChatStreamState } from '@/components/chat/chat-stream-state';
import type { OngoingMessage, UseChatReturns } from '@/components/chat/use-chat';
import { useMemo } from 'react';

export type MyConversationMessageGroup = FinishedConversationGroup | OngoingConversationMessageGroup;

export interface FinishedConversationGroup {
  id: number;
  finished: true;
  userMessage: Pick<ChatMessage, 'content' | 'id'>;
  assistantMessage: ChatMessage;
}

export interface OngoingConversationMessageGroup {
  id: number;
  finished: false;
  userMessage: Pick<ChatMessage, 'content' | 'id'>;
  assistantMessage: OngoingMessage;
}

export function getStateOfMessage (message: ChatMessage | OngoingMessage) {
  if ('state' in message) {
    return message.state;
  } else {
    if (message.finished_at) {
      return AppChatStreamState.FINISHED;
    } else {
      return AppChatStreamState.GENERATE_ANSWER;
    }
  }
}

export function useGroupedConversationMessages (myChat: UseChatReturns) {
  const { error, messages, ongoingMessage, isLoading, postingMessage } = myChat;

  return useMemo(() => {
    const groups: MyConversationMessageGroup[] = [];
    let userMessage: ChatMessage | undefined;
    let assistantMessage: ChatMessage | undefined;

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (message.role === 'user') {
        // FIXME: what if no assistance message?
        userMessage = message;
      } else if (message.role === 'assistant') {
        assistantMessage = message;
      }
      if (userMessage && assistantMessage) {
        groups.push({
          id: userMessage.id,
          userMessage,
          assistantMessage,
          finished: true,
        });
        userMessage = undefined;
        assistantMessage = undefined;
      }
    }

    if (ongoingMessage) {
      if (userMessage) {
        groups.push({
          id: userMessage.id,
          userMessage,
          assistantMessage: ongoingMessage,
          finished: false,
        });
      } else if (postingMessage) {
        groups.push({
          id: 0,
          userMessage: { content: postingMessage.content, id: 0 },
          assistantMessage: ongoingMessage,
          finished: false,
        });
      } else {
        console.error('No user message for ongoing message.');
      }
    }

    return groups;
  }, [messages, ongoingMessage, postingMessage, isLoading, error]);
}
