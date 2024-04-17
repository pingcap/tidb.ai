'use client';

import { __useHandleInitialMessage } from '@/app/(main)/(public)/c/[id]/internal';
import { ConversationMessageGroups } from '@/components/conversation-message-group';
import { MessageInput } from '@/components/message-input';
import { SecuritySettingContext, withReCaptcha } from '@/components/security-setting-provider';
import type { ChatMessage } from '@/core/repositories/chat';
import { type AppChatStreamSource, AppChatStreamState } from '@/lib/ai/AppChatStreamData';
import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { type FormEvent, useContext, useEffect, useMemo, useRef, useState } from 'react';

export function Conversation ({ open, history, context }: { open: boolean, history: ChatMessage[], context: { ordinal: number, title: string, uri: string }[] }) {
  const { handleInputChange, isWaiting, handleSubmit, input, isLoading, data, error, messages } = useMyChat(history, context);
  const [size, setSize] = useState<DOMRectReadOnly | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  const security = useContext(SecuritySettingContext);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const ro = new ResizeObserver(() => {
        setSize(el.getBoundingClientRect());
      });

      setSize(el.getBoundingClientRect());
      ro.observe(el);
      ro.observe(document.documentElement);
      return () => {
        ro.disconnect();
      };
    }
  }, []);

  const submitWithReCaptcha = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    withReCaptcha({
      action: 'chat',
      siteKey: security?.google_recaptcha_site_key || '',
      mode: security?.google_recaptcha,
    }, ({ token, action }) => {
      handleSubmit(e, {
        options: {
          headers: {
            'X-Recaptcha-Token': token,
            'X-Recaptcha-Action': action,
          },
        },
      });
    });
  };

  return (
    <>
      <div ref={ref} className={cn(
        'md:max-w-screen-md mx-auto space-y-4 transition-all relative md:min-h-screen md:p-body',
      )}>
        <ConversationMessageGroups history={history} messages={messages} data={data} error={error} isLoading={isLoading || isWaiting} />
        <div className="h-24"></div>
      </div>
      {size && open && <form className="block h-max p-4 fixed bottom-0" onSubmit={submitWithReCaptcha} style={{ left: size.x, width: size.width }}>
        <MessageInput className="w-full transition-all" disabled={isLoading} inputProps={{ value: input, onChange: handleInputChange, disabled: isLoading }} />
      </form>}
    </>
  );
}

function useMyChat (history: ChatMessage[], context: { ordinal: number, title: string, uri: string }[]) {
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

  const chat = useChat({
    api: '/api/v1/chats',
    body: {
      sessionId: session,
      // TODO: Support specifying namespaces manually.
      namespaces: [],
    },
    key: session,
    initialMessages: history.map(message => ({
      id: String(message.id),
      role: message.role as any,
      content: message.content,
    })),
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

  const data: MyChatData = useMemo(() => {
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
    handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: any) => {
      setWaiting(true);
      chat.handleSubmit(e, chatRequestOptions);
    },
  };
}

export type MyChatData = Record<string, { context?: AppChatStreamSource[], state?: AppChatStreamState, stateMessage?: string }>;