import { __useHandleInitialMessage } from '@/app/(main)/(public)/c/[id]/internal';
import { createInitialMessages, getChatMessageAnnotations } from '@/components/chat/utils';
import type { ChatMessage } from '@/core/repositories/chat';
import type { ChatRequestOptions } from 'ai';
import { useChat } from 'ai/react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useMemo, useState } from 'react';

export function useMyChat (history: ChatMessage[], context: { ordinal: number, title: string, uri: string }[], open: boolean) {
  const { id: session } = useParams<{ id: string }>();
  const pathname = usePathname();

  const [isWaiting, setWaiting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/') {
      if (session) {
        router.push(`/c/${session}`);
      }
    }
  }, [session, pathname]);

  const initialMessages = useMemo(() => {
    return createInitialMessages(history, context);
  }, [history, context]);

  const chat = useChat({
    api: `/api/v1/chats/${session}/messages`,
    initialMessages,
    onResponse: () => {
      setWaiting(false);
    },
    onFinish: (message) => {
      if (message.role !== 'assistant') {
        return;
      }
    },
  });

  const useSubscribeMessages = () => {
    const [_, setVersion] = useState(0);
    useEffect(() => {
      setVersion(version => version + 1);
    }, [chat.messages]);
  };

  __useHandleInitialMessage(chat, setWaiting);

  return {
    ...chat,
    open,
    isWaiting,
    useSubscribeMessages,
    handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => {
      chat.handleSubmit(e, chatRequestOptions);
    },
    handleRegenerate: (messageId: string) => {
      const regeneratingMessageIndex = chat.messages.findIndex(msg => msg.id === messageId);
      if (regeneratingMessageIndex === -1) {
        throw new Error('Failed to regenerate');
      }

      const regeneratingMessage = chat.messages[regeneratingMessageIndex];

      if (chat.messages[regeneratingMessageIndex].role !== 'assistant') {
        throw new Error('Only support to regenerate assistant message');
      }

      chat.setMessages(chat.messages.slice(0, regeneratingMessageIndex));

      void chat.reload({
        options: {
          body: {
            regenerate: true,
            messageId: getChatMessageAnnotations(regeneratingMessage).messageId,
          },
        },
      });
    },
  };
}
