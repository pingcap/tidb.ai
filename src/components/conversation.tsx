'use client';

import { __useHandleInitialMessage } from '@/app/(main)/(public)/conversations/[id]/internal';
import { ConversationMessageGroups } from '@/components/conversation-message-group';
import { MessageInput } from '@/components/message-input';
import type { DB } from '@/core/db/schema';
import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import type { Selectable } from 'kysely';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useMemo, useState } from 'react';

export function Conversation ({ open, history, context }: { open: boolean, history: Selectable<DB['chat_message']>[], context: { ordinal: number, title: string, uri: string }[] }) {
  const { handleInputChange, isWaiting, handleSubmit, input, isLoading, data, error, messages } = useMyChat(history, context);

  return (
    <div className={cn(
      'max-w-screen-sm mx-auto space-y-4 transition-all relative min-h-screen p-body',
    )}>
      <ConversationMessageGroups messages={messages} data={data} isLoading={isLoading} />
      <div className="h-24"></div>
      {open && <form className="w-full absolute bottom-0 p-4" onSubmit={handleSubmit}>
        <MessageInput className="w-full transition-all" disabled={isLoading} inputProps={{ value: input, onChange: handleInputChange, disabled: isLoading }} />
      </form>}
    </div>
  );
}

function useMyChat (history: Selectable<DB['chat_message']>[], context: { ordinal: number, title: string, uri: string }[]) {
  const params = useParams<{ id: string }>();
  const pathname = usePathname();

  const [isWaiting, setWaiting] = useState(false);
  const [session, setSession] = useState<string | undefined>(() => params.id && decodeURIComponent(params.id));
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/') {
      if (session) {
        router.push(`/conversations/${session}`);
      }
    }
  }, [session, pathname]);

  const chat = useChat({
    api: '/api/v1/chats',
    body: {
      sessionId: session,
    },
    key: session,
    initialMessages: history,
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

  const data = useMemo(() => {
    const ssrData = context.reduce((res, item) => {
      res[String(item.ordinal)] = res[String(item.ordinal)] || { context: [] };
      res[String(item.ordinal)].context.push(item);
      return res;
    }, {} as any);

    return Object.assign({}, ssrData, ...(chat.data || []) as any);
  }, [chat.data, context]);

  return {
    ...chat,
    data,
    isWaiting,
    handleSubmit: (e: FormEvent<HTMLFormElement>) => {
      setWaiting(true);
      chat.handleSubmit(e);
    },
  };
}
