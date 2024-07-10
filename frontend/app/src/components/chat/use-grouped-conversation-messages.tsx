import type { ChatMessage } from '@/api/chats';
import type { OngoingState } from '@/components/chat/chat-controller';
import { AppChatStreamState } from '@/components/chat/chat-stream-state';
import { format } from 'date-fns';
import { useMemo } from 'react';

export type MyConversationMessageGroup = FinishedConversationGroup | OngoingConversationMessageGroup;

export interface FinishedConversationGroup {
  id: number;
  finished: true;
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
}

export interface OngoingConversationMessageGroup {
  id: number;
  finished: false;
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
  ongoing: OngoingState;
}

export function useGroupedConversationMessages (messages: (ChatMessage & { ongoing?: OngoingState })[]) {
  return useMemo(() => {
    const groups: MyConversationMessageGroup[] = [];
    let userMessage: ChatMessage | undefined;
    let assistantMessage: ChatMessage & { ongoing?: OngoingState } | undefined;

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (message.role === 'user') {
        // FIXME: what if no assistance message?
        userMessage = message;
      } else if (message.role === 'assistant') {
        assistantMessage = message;
      }

      if (userMessage && assistantMessage) {
        if (assistantMessage.finished_at) {
          groups.push({
            id: userMessage.id,
            userMessage,
            assistantMessage,
            finished: true,
          });
        } else {
          if (assistantMessage.error) {
            groups.push({
              id: userMessage.id,
              userMessage,
              assistantMessage,
              ongoing: assistantMessage.ongoing ?? {
                state: AppChatStreamState.FAILED,
                display: 'Failed',
                finished: true,
              },
              finished: false,
            });
          } else {
            // TODO: server could provide an API to provide chat's generating state.
            groups.push({
              id: userMessage.id,
              userMessage,
              assistantMessage,
              ongoing: assistantMessage.ongoing ?? {
                state: AppChatStreamState.UNKNOWN,
                display: 'Unknown',
                finished: false,
              },
              finished: false,
            });
          }
        }

        userMessage = undefined;
        assistantMessage = undefined;
      }
    }

    return groups;
  }, [messages]);
}
