import type { ChatEngineOptions } from '@/api/chat-engines';
import type { Chat, ChatMessage, ChatMessageSource, PostChatParams } from '@/api/chats';
import * as api from '@/api/chats';
import { AppChatStreamState, type ChatMessageAnnotation } from '@/components/chat/chat-stream-state';
import { getErrorMessage } from '@/lib/errors';
import { useEffect, useRef, useState } from 'react';

export type OngoingMessage = PendingOngoingMessage | FinishedOngoingMessage;

export interface PendingOngoingMessage {
  trace_url: string | null;
  state: AppChatStreamState;
  display: string;
  error?: string;
  sources?: ChatMessageSource[];

  chatId?: string;
  id?: number;

  content: string;
  finished: false;
}

export interface FinishedOngoingMessage {
  trace_url: string;
  state: AppChatStreamState;
  display: string;
  error?: string;
  sources: ChatMessageSource[];

  chatId: string;
  id: number;

  content: string;
  finished: true;
}

export interface UseChatOptions {
  chat?: Chat;
  messages?: ChatMessage[];
  onChatCreated?: (id: string) => void;
  onChatFinished?: () => void;
}

export interface UseChatReturns {
  isNewChat: boolean;
  engineOptions: ChatEngineOptions | undefined;

  messages: ChatMessage[];
  ongoingMessage: OngoingMessage | undefined;
  postingMessage: PostChatParams | undefined;

  isLoading: boolean;
  error?: unknown;

  reset (): void;

  post (params: Omit<PostChatParams, 'chat_id'>, onResponse?: (response: Response) => void): Promise<void>;

  regenerate (id: number): Promise<void>;
}

export function useChat ({ chat: initialChat, messages: initialMessages = [], onChatCreated }: UseChatOptions): UseChatReturns {
  const [chat, setChat] = useState(initialChat);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [ongoingMessage, setOngoingMessage] = useState<OngoingMessage | undefined>(undefined);
  const [error, setError] = useState<unknown>();
  const [postingMessage, setPostingMessage] = useState<PostChatParams>();
  const abortControllerRef = useRef<AbortController>();

  const post = async (params: PostChatParams, onResponse?: (response: Response) => void) => {
    if (ongoingMessage) {
      return Promise.reject(new Error('Last message not finished.'));
    }
    const ac = abortControllerRef.current = new AbortController();
    setPostingMessage({ ...params, chat_id: chat?.id });
    setError(undefined);
    setOngoingMessage({ trace_url: null, state: AppChatStreamState.CONNECTING, display: 'Connecting to server...', content: '', finished: false });
    try {
      for await (let part of api.chat({ ...params, chat_id: chat?.id, signal: ac.signal }, (response) => {
        onResponse?.(response);
        if (chat) {
          api.getChat(chat.id)
            .then(({ chat, messages }) => {
              setChat(chat);
              setMessages(messages.filter(msg => msg.role === 'user' || !!msg.finished_at));
            });
        }
      })) {
        if (ac.signal.aborted) {
          break;
        }
        switch (part.type) {
          case 'text':
            setOngoingMessage(assertOngoingMessage(msg => applyContent(msg, part.value)));
            break;
          case 'message_annotations':
            setOngoingMessage(assertOngoingMessage(msg => applyAnnotation(msg, part.value[0] as any)));
            break;
          case 'error':
            setOngoingMessage(optionalOngoingMessage(msg => ({ ...msg, error: part.value, finished: true } as FinishedOngoingMessage)));
            break;
          default:
            warnUnsupportedPartType(part.type, part.value);
            break;
        }
      }

      setOngoingMessage(optionalOngoingMessage(msg => ({ ...msg, finished: true } as FinishedOngoingMessage)));
    } catch (error) {
      setOngoingMessage(optionalOngoingMessage(msg => ({ ...msg, error: getErrorMessage(error), finished: true } as FinishedOngoingMessage)));
      setError(error);
    }
  };

  const reset = (chat: Chat | undefined = undefined, messages: ChatMessage[] = []) => {
    abortControllerRef.current?.abort('reset');
    setError(undefined);
    setChat(chat);
    setMessages(messages);
    setOngoingMessage(undefined);
    abortControllerRef.current = undefined;
    setPostingMessage(undefined);
  };

  const regenerate = async (id: number) => {
    throw new Error('Not implemented');
  };

  useEffect(() => {
    if (!chat && ongoingMessage) {
      if (ongoingMessage.chatId) {
        onChatCreated?.(ongoingMessage.chatId);
        api.getChat(ongoingMessage.chatId)
          .then(({ chat, messages }) => {
            setChat(chat);
            setMessages(messages.filter(msg => msg.role === 'user' || !!msg.finished_at));
          });
      }
    }
    if (chat && ongoingMessage?.finished && !ongoingMessage.error) {
      api.getChat(ongoingMessage.chatId)
        .then(({ chat, messages }) => {
          setChat(chat);
          setMessages(messages);
          setOngoingMessage(undefined);
        });
    }
  }, [ongoingMessage, !chat]);

  return {
    isNewChat: !chat,
    engineOptions: chat?.engine_options,
    messages,
    ongoingMessage,
    postingMessage,
    isLoading: !!ongoingMessage && !ongoingMessage.finished,
    error,
    post,
    reset,
    regenerate,
  };
}

function assertOngoingMessage (mutate: (msg: OngoingMessage) => OngoingMessage): (msg: OngoingMessage | undefined) => OngoingMessage | undefined {
  return msg => {
    if (!msg) {
      throw new Error('Bad state, no ongoing msg');
    }

    return mutate(msg);
  };
}

function optionalOngoingMessage (mutate: (msg: OngoingMessage) => OngoingMessage): (msg: OngoingMessage | undefined) => OngoingMessage | undefined {
  return msg => {
    return msg ? mutate(msg) : undefined;
  };
}

const warnedTypes = new Set<string>();

function warnUnsupportedPartType (type: string, value: any) {
  if (warnedTypes.has(type)) {
    return;
  }

  console.warn(`Currently stream part type ${type} is not supported.`, value);
  warnedTypes.add(type);
}

function applyContent (msg: OngoingMessage, delta: string) {
  msg = { ...msg };

  if (msg.state !== AppChatStreamState.GENERATE_ANSWER) {
    msg.state = AppChatStreamState.GENERATE_ANSWER;
    msg.display = 'Generating answer...';
  }

  msg.content += delta;

  return msg;
}

function applyAnnotation (msg: OngoingMessage, annotation: ChatMessageAnnotation) {
  msg = { ...msg };

  msg.state = annotation.state;
  msg.display = annotation.display;

  switch (annotation.state) {
    case AppChatStreamState.TRACE:
      msg.trace_url = annotation.context.langfuse_url;
      break;
    case AppChatStreamState.SOURCE_NODES:
      msg.sources = annotation.context;
      break;
  }

  if (annotation.chat_id) {
    if (!msg.chatId) {
      msg.chatId = annotation.chat_id;
    } else if (msg.chatId !== annotation.chat_id) {
      throw new Error('Chat id changed!');
    }
  }

  if (annotation.message_id) {
    if (!msg.id) {
      msg.id = annotation.message_id;
    } else if (msg.id !== annotation.message_id) {
      throw new Error('Message id changed!');
    }
  }

  return msg;
}