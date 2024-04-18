import { __useHandleInitialMessage } from '@/app/(main)/(public)/c/[id]/internal';
import { createInitialMessages } from '@/components/chat/utils';
import type { ChatMessage } from '@/core/repositories/chat';
import type { ChatRequestOptions } from 'ai';
import { useChat } from 'ai/react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useMemo, useState } from 'react';

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
    },
    onFinish: (message) => {
      if (message.role !== 'assistant') {
        return;
      }
    },
  });

  __useHandleInitialMessage(chat, setWaiting);

  return {
    ...chat,
    isWaiting,
    handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => {
      setWaiting(true);
      chat.handleSubmit(e, chatRequestOptions);
    },
  };
}
