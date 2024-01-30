'use client';

import { AutoScroll } from '@/components/auto-scroll';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { getErrorMessage } from '@/lib/error';
import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import { LinkIcon } from 'lucide-react';
import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import * as prod from 'react/jsx-runtime';
import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

declare module 'ai/react' {
  interface Message {
    context?: string[];
  }
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

export default function Page () {
  const { handleInputChange, isWaiting, handleSubmit, input, isLoading, data, error, messages } = useMyChat();

  return (
    <div className="p-body space-y-4">
      <div className={cn(
        'max-w-screen-sm mx-auto space-y-4 flex flex-col items-stretch transition-all',
        (messages.length === 0 && !error) ? 'h-0' : 'h-content',
      )}>
        <AutoScroll>
          <ScrollArea className="flex-1">
            <ScrollBar orientation="vertical" />
            <ul className="space-y-6 p-6">
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
                            <div className='opacity-70'>
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
              {error && <Alert>
                <AlertTitle>Something wrong TaT</AlertTitle>
                <AlertDescription>
                  {getErrorMessage(error)}
                </AlertDescription>
              </Alert>}
            </ul>
          </ScrollArea>
        </AutoScroll>
        <form className="flex-shrink-0 flex gap-2 mx-6" onSubmit={handleSubmit}>
          <Input
            autoFocus
            className="dark:invert flex-1"
            placeholder="Ask sth..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button disabled={isLoading}>Go</Button>
        </form>
      </div>
    </div>
  );
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
      role === 'user' ? 'items-end animate-fade-in-right' : 'animate-fade-in-left',
    )}>
      <address className="text-sm">{role}</address>
      <div className="max-w-sm py-2 px-4 rounded-lg bg-card border">
        <article className="prose prose-sm prose-neutral dark:prose-invert overflow-x-hidden break-all">
          {mdContent}
        </article>
      </div>
      {children}
    </li>
  );
}

function useMyChat () {
  const [isWaiting, setWaiting] = useState(false);
  const [session, setSession] = useState<string>();

  const chat = useChat({
    api: '/api/v1/chats',
    body: {
      sessionId: session,
    },
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

  const data = useMemo(() => {
    return Object.assign({}, ...(chat.data || []) as any);
  }, [chat.data]);

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
