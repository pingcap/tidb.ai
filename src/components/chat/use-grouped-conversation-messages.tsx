import { getChatMessageAnnotations } from '@/components/chat/utils';
import type { ChatMessage } from '@/core/repositories/chat';
import type { AppChatStreamSource, AppChatStreamState } from '@/lib/ai/AppChatStream';
import { Message } from 'ai';
import { useMemo } from 'react';

export type ConversationMessageGroupProps = FinishedConversationMessage | PendingConversationMessage;

export type FinishedConversationMessage = {
  id: string
  userMessage: Message
  assistantMessage: Message
  assistantMessageError?: string;
  assistantAnnotation: MyChatMessageAnnotation
  finished: true
}

export type PendingConversationMessage = {
  id: string
  userMessage: Message
  assistantMessage: Message | undefined
  assistantMessageError?: string; // This is from server
  assistantAnnotation: MyChatMessageAnnotation // This could contain error form stream data
  finished: false
  error_message?: string
}

export type MyChatMessageAnnotation = {
  ts: number;
  messageId: number;
  traceURL?: string,
  context?: AppChatStreamSource[],
  state?: AppChatStreamState,
  stateMessage?: string
};

export const EMPTY_CHAT_MESSAGE_ANNOTATION: MyChatMessageAnnotation = { ts: -1, messageId: -1 }

// TODO: refactor
export function useGroupedConversationMessages (history: ChatMessage[], messages: Message[], isLoading: boolean, error: unknown) {
  return useMemo(() => {
    const groups: ConversationMessageGroupProps[] = [];
    let userMessage: Message | undefined;
    let assistantMessage: Message | undefined;
    let assistantAnnotation: MyChatMessageAnnotation = EMPTY_CHAT_MESSAGE_ANNOTATION;

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (message.role === 'user') {
        // FIXME: what if no assistance message?
        userMessage = message;
      } else if (message.role === 'assistant') {
        assistantMessage = message;
        assistantAnnotation = getChatMessageAnnotations(assistantMessage);
      }
      if (userMessage && assistantMessage) {
        groups.push({
          id: userMessage.id,
          userMessage,
          assistantMessage,
          assistantMessageError: history[i]?.error_message ?? undefined,
          assistantAnnotation: { ...assistantAnnotation, traceURL: assistantAnnotation.traceURL ?? history[i]?.trace_url ?? undefined },
          finished: true,
        });
        userMessage = undefined;
        assistantMessage = undefined;
        assistantAnnotation = EMPTY_CHAT_MESSAGE_ANNOTATION;
      }
    }

    if (userMessage) {
      groups.push({
        id: userMessage.id,
        userMessage,
        assistantMessage: undefined,
        assistantAnnotation,
        finished: false,
      });
    }

    if (isLoading) {
      const group = groups[groups.length - 1];
      group.finished = false;

      if (!group.assistantAnnotation.state) {
        group.assistantAnnotation.state = 'CONNECTING' as AppChatStreamState;
      }
    }

    if (error) {
      groups[groups.length - 1].finished = true;
    }

    return groups;
  }, [messages, isLoading, error]);
}
