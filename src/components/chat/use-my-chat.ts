import { __useHandleInitialMessage } from '@/app/(main)/(public)/c/[id]/internal';
import { createInitialMessages, getChatMessageAnnotations } from '@/components/chat/utils';
import type { ChatMessage } from '@/core/repositories/chat';
import type { ChatRequestOptions } from 'ai';
import { parseStreamPart } from 'ai';
import { useChat } from 'ai/react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useMemo, useState } from 'react';

export type MyChat = ReturnType<typeof useMyChat>;

export function useMyChat (history: ChatMessage[], context: { ordinal: number, title: string, uri: string }[]) {
  const params = useParams<{ id: string }>();
  const pathname = usePathname();

  const [isWaiting, setWaiting] = useState(false);
  const [session, setSession] = useState<string | undefined>(() => params.id && decodeURIComponent(params.id));
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
    api: '/api/v1/chats',
    body: {
      sessionId: session,
      // TODO: Support specifying namespaces manually.
      namespaces: [],
    },
    key: session,
    initialMessages,
    onResponse: response => {
      setWaiting(false);
      setSession(response.headers.get('X-CreateRag-Session') ?? undefined);
      const reader = response.clone().body?.getReader();
      ;(async () => {
        const decoder = new TextDecoder();
        if (reader) {
          while (true) {
            const chunk = await reader.read();
            if (chunk.done) {
              break;
            }

            const textPart = decoder.decode(chunk.value, { stream: true });
            try {
              console.debug('[chunk.raw.json]', new Date, textPart.split('\n').filter(Boolean).map(parseStreamPart));
            } catch {
              console.debug('[chunk.raw.text]', new Date, textPart);
            }
          }
        }
      })();
    },
    onFinish: (message) => {
      if (message.role !== 'assistant') {
        return;
      }
    },
  });

  console.log('[chat.update]');

  __useHandleInitialMessage(chat, setWaiting);

  return {
    ...chat,
    isWaiting,
    handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => {
      setWaiting(true);
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
