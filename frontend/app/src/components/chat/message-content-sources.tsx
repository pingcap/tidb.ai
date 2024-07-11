import type { ChatMessageSource } from '@/api/chats';
import type { ChatMessageController } from '@/components/chat/chat-controller';
import { useChatMessageField } from '@/components/chat/chat-hooks';
import { parseSource } from '@/components/chat/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { LinkIcon, TextSearchIcon } from 'lucide-react';
import { useMemo } from 'react';

export function MessageContextSources ({ message }: { message: ChatMessageController | undefined }) {
  const sources = useChatMessageField(message, 'sources');
  if (!sources || sources.length === 0) {
    return null;
  }

  const uriSet = new Set<string>();
  const reducedContext = sources.filter(source => {
    if (uriSet.has(source.source_uri)) {
      return false;
    }
    uriSet.add(source.source_uri);
    return true;
  });

  return (
    <section className="space-y-0">
      <div className="font-normal text-lg flex items-center gap-2">
        <TextSearchIcon size="1em" />
        Sources
      </div>
      <ScrollArea className="h-max w-full">
        <ul className="flex gap-2 py-4">
          {reducedContext.map(source => (
            <MessageContextSource key={source.source_uri} context={source} />
          ))}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

function MessageContextSource ({ context }: { context: ChatMessageSource }) {
  const source = useMemo(() => {
    return parseSource(context.source_uri);
  }, [context.source_uri]);

  return (
    <li key={context.id} className="bg-card hover:bg-accent transition-colors w-[200px] overflow-hidden rounded-lg border text-xs">
      <a className="flex flex-col justify-between space-y-1 p-2 max-w-full h-full" href={context.source_uri} target="_blank">
        <div className="font-normal line-clamp-3 opacity-90">
          {context.name}
        </div>
        <div className="opacity-70 mt-auto mb-0">
          <LinkIcon size="1em" className="inline-flex mr-1" />
          {source}
        </div>
      </a>
    </li>
  );
}

export function MessageContextSourceCard ({ title, href }: { title?: string, href?: string }) {
  const source = useMemo(() => {
    return parseSource(href);
  }, [href]);

  return (
    <a className="flex flex-col justify-between space-y-1 p-2 max-w-full h-full" href={href} target="_blank">
      <div className="font-normal line-clamp-3 opacity-90">
        {title}
      </div>
      <div className="opacity-70 mt-auto mb-0">
        <LinkIcon size="1em" className="inline-flex mr-1" />
        {source}
      </div>
    </a>
  );
}
