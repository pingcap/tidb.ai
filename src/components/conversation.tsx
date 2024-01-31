'use client';

import { __useHandleInitialMessage } from '@/app/(main)/(public)/conversations/[id]/internal';
import { AutoScroll } from '@/components/auto-scroll';
import { MessageInput } from '@/components/message-input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import type { DB } from '@/core/db/schema';
import { getErrorMessage } from '@/lib/error';
import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import type { Selectable } from 'kysely';
import { LinkIcon, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import * as prod from 'react/jsx-runtime';
import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export function Conversation ({ open, history, context }: { open: boolean, history: Selectable<DB['chat_message']>[], context: { ordinal: number, title: string, uri: string }[] }) {
  const { handleInputChange, isWaiting, handleSubmit, input, isLoading, data, error, messages } = useMyChat(history, context);

  return (
    <div className={cn(
      'max-w-screen-sm mx-auto space-y-4 transition-all relative h-screen p-body',
    )}>
      <AutoScroll>
        <ScrollArea className="h-full">
          <ScrollBar orientation="vertical" />
          <ul className="space-y-6 p-6 pb-24">
            {messages.map((item, index) => (
              <ChatMessage key={item.id} role={item.role} content={item.content}>
                {data[String(index + 1)] && (
                  <ul className="flex gap-2 flex-wrap">
                    {data[String(index + 1)].context.map((item: { uri: string, title: string }) => (
                      <li key={item.uri} className="max-w-[400px] rounded-lg border bg-card text-xs transition-all hover:shadow-lg hover:-translate-y-0.5">
                        <a className="block space-y-1 p-2" href={item.uri}>
                          <div className="font-semibold">
                            <LinkIcon size="1em" className="inline-flex mr-1" />
                            {item.title}
                          </div>
                          <div className="opacity-70">
                            {parseSource(item.uri)}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </ChatMessage>
            ))}
            {isWaiting && <ChatMessagePlaceholder role="assistant" />}
            {error && <li><Alert>
              <AlertTitle>Something wrong TaT</AlertTitle>
              <AlertDescription>
                {getErrorMessage(error)}
              </AlertDescription>
            </Alert>
            </li>}
          </ul>
        </ScrollArea>
      </AutoScroll>
      {open && <form className="w-full absolute bottom-0 p-4" onSubmit={handleSubmit}>
        <MessageInput className="w-full transition-all" disabled={isLoading} inputProps={{ value: input, onChange: handleInputChange, disabled: isLoading }} />
      </form>}
    </div>
  );
}

const production = { Fragment: (prod as any).Fragment, jsx: (prod as any).jsx, jsxs: (prod as any).jsxs };

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeReact, production)
  .freeze();

function useRemarkReact (text: string) {
  const [el, setEl] = useState<ReactNode>(null);

  useEffect(() => {
    processor.process(text ?? '')
      .then(res => {
        setEl(res.result);
      });
  }, [text]);

  return el;
}

function parseSource (uri: string) {
  if (!uri) {
    return 'Unknown';
  }
  if (/^https:\/\//.test(uri)) {
    return new URL(uri).hostname;
  } else {
    return uri;
  }
}

type HistoryMessage = {
  role: 'assistant' | 'system' | 'user' | string;
  content: string;
  children?: ReactNode;
}

function ChatMessagePlaceholder ({ role }: { role: string }) {
  return (
    <li className={cn('flex flex-col gap-1 items-start', role === 'user' && 'items-end')}>
      <address className="text-sm">{role}</address>
      <div className="max-w-sm py-2 px-4 rounded-lg bg-card border">
        <article className="prose prose-sm prose-neutral dark:prose-invert">
          <Skeleton className="w-12 h-4 inline-block rounded-lg" />
        </article>
      </div>
    </li>
  );
}

function ChatMessage ({ role, content, children }: HistoryMessage) {
  const mdContent = useRemarkReact(content);

  return (
    <li className={cn(
      'flex flex-col gap-2 items-start',
      role === 'user' ? 'items-end' : '',
    )}>
      <div className="max-w-sm py-2 px-4 rounded-lg bg-card border">
        <article className="prose prose-sm prose-neutral dark:prose-invert overflow-x-hidden break-all">
          {mdContent}
        </article>
      </div>
      {children}
      {role === 'assistant' && (
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="rounded-full">
            <ThumbsUp className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full">
            <ThumbsDown className="w-4 h-4" />
          </Button>
        </div>
      )}
    </li>
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
