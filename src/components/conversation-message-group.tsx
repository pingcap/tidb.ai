import { RemarkContent } from '@/components/remark-content';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { getErrorMessage } from '@/lib/errors';
import { Message } from 'ai';
import { AlertTriangleIcon, AlignLeftIcon, ClipboardIcon, LinkIcon, RefreshCwIcon, ShareIcon, TextSearchIcon, ThumbsDown } from 'lucide-react';
import { useMemo } from 'react';

type MessageContext = { uri: string, title: string };

type ConversationMessageGroupProps = FinishedConversationMessage | PendingConversationMessage;

type FinishedConversationMessage = {
  id: string
  userMessage: Message
  assistantMessage: Message
  assistantContext: MessageContext[]
  finished: true
}

type PendingConversationMessage = {
  id: string
  userMessage: Message
  assistantMessage: Message | undefined
  assistantContext: MessageContext[]
  finished: false
}

function useGroupedConversationMessages (messages: Message[], data: any, isLoading: boolean, error: unknown) {
  return useMemo(() => {
    const groups: ConversationMessageGroupProps[] = [];
    let userMessage: Message | undefined;
    let assistantMessage: Message | undefined;
    let context: { uri: string, title: string }[] | undefined;

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (message.role === 'user') {
        userMessage = message;
      } else if (message.role === 'assistant') {
        assistantMessage = message;
        context = data[String(i + 1)]?.context;
      }
      if (userMessage && assistantMessage) {
        const uriSet = new Set<string>();

        groups.push({
          id: userMessage.id,
          userMessage,
          assistantMessage,
          assistantContext: (context ?? []).filter(item => {
            if (uriSet.has(item.uri)) {
              return false;
            } else {
              uriSet.add(item.uri);
              return true;
            }
          }),
          finished: true,
        });
        userMessage = undefined;
        assistantMessage = undefined;
        context = undefined;
      }
    }

    if (userMessage) {
      groups.push({
        id: userMessage.id,
        userMessage,
        assistantMessage: undefined,
        assistantContext: context ?? [],
        finished: false,
      });
    }

    if (isLoading) {
      groups[groups.length - 1].finished = false;
    }

    if (error) {
      groups[groups.length - 1].finished = true;
    }

    return groups;
  }, [messages, data, isLoading, error]);
}

export function parseSource (uri: string) {
  if (!uri) {
    return 'Unknown';
  }
  if (/^https:\/\//.test(uri)) {
    return new URL(uri).hostname;
  } else {
    return uri;
  }
}

export function ConversationMessageGroups ({ messages, data, error, isLoading }: { messages: Message[], data: any, error: unknown, isLoading: boolean }) {
  const groups = useGroupedConversationMessages(messages, data, isLoading, error);

  return (
    <div className="space-y-8">
      {groups.map(group => (
        <ConversationMessageGroup key={group.id} group={group} />
      ))}
      {!!error && <Alert variant="destructive">
        <AlertTriangleIcon />
        <AlertTitle>Fail to chat with TiDB.ai</AlertTitle>
        <AlertDescription>{getErrorMessage(error)}</AlertDescription>
      </Alert>}
    </div>
  );
}

function ConversationMessageGroup ({ group }: { group: ConversationMessageGroupProps }) {
  return (
    <section className="space-y-6 p-4 border-b pb-10 last-of-type:border-b-0 last-of-type:border-pb-4">
      <h2 className="text-2xl font-normal">{group.userMessage.content}</h2>
      {group.assistantContext.length > 0 && (
        <section className="space-y-0">
          <div className="font-normal text-lg flex items-center gap-2">
            <TextSearchIcon size="1em" />
            Sources
          </div>
          <ScrollArea className="h-max w-full">
            <ul className="flex gap-2 py-4">
              {group.assistantContext.map(context => (
                <MessageContextSource key={context.uri} context={context} />
              ))}
            </ul>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      )}
      <section className="space-y-2">
        <div className="font-normal text-lg flex items-center gap-2">
          <img className="dark:hidden h-4" src="/answer-black.svg" alt="logo" />
          <img className="hidden dark:block h-4" src="/answer-white.svg" alt="logo" />
          Answer
        </div>
        <article className="prose prose-sm prose-neutral dark:prose-invert overflow-x-hidden break-all">
          {!group.finished && !group.assistantMessage?.content && (
            <Skeleton className="w-12 h-4 inline-block rounded-lg" />
          )}
          {group.assistantMessage?.content && <RemarkContent>
            {group.assistantMessage.content}
          </RemarkContent>}
        </article>
      </section>
      {group.finished && (
        <div className="flex items-center gap-2">
          <Button size="sm" className="gap-1 text-xs px-2 py-1 h-max" variant="ghost">
            <ShareIcon size="1em" />
            Share
          </Button>
          <Button size="sm" className="gap-1 text-xs px-2 py-1 h-max" variant="ghost">
            <RefreshCwIcon size="1em" />
            Regenerate
          </Button>
          <Button size="icon" variant="ghost" className="ml-auto rounded-full w-7 h-7">
            <ThumbsDown className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full w-7 h-7">
            <ClipboardIcon className="w-4 h-4" />
          </Button>
        </div>
      )}
    </section>
  );
}

function MessageContextSource ({ context }: { context: MessageContext }) {
  const source = useMemo(() => {
    return parseSource(context.uri);
  }, [context.uri]);

  return (
    <li key={context.uri} className="bg-card hover:bg-accent transition-colors w-[200px] overflow-hidden rounded-lg border text-xs">
      <a className="flex flex-col justify-between space-y-1 p-2 max-w-full h-full" href={context.uri} target="_blank">
        <div className="font-normal line-clamp-3 opacity-90">
          {context.title}
        </div>
        <div className="opacity-70 mt-auto mb-0">
          <LinkIcon size="1em" className="inline-flex mr-1" />
          {source}
        </div>
      </a>
    </li>
  );
}
