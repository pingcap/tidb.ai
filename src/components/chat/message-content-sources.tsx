import { type ConversationMessageGroupProps } from '@/components/chat/use-grouped-conversation-messages';
import { parseSource } from '@/components/chat/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import type { AppChatStreamSource } from '@/lib/ai/AppChatStream';
import { LinkIcon, TextSearchIcon } from 'lucide-react';
import { useMemo } from 'react';

export function MessageContextSources ({ group }: { group: ConversationMessageGroupProps }) {
  const { context } = group.assistantAnnotation;
  if (!context || context.length === 0) {
    return null;
  }

  const reducedContext = useMemo(() => {
    const uriSet = new Set<string>();
    return context.filter(source => {
      if (uriSet.has(source.uri)) {
        return false;
      }
      uriSet.add(source.uri);
      return true;
    });
  }, [context]);

  return (
    <section className="space-y-0">
      <div className="font-normal text-lg flex items-center gap-2">
        <TextSearchIcon size="1em" />
        Sources
      </div>
      <ScrollArea className="h-max w-full">
        <ul className="flex gap-2 py-4">
          {reducedContext.map(source => (
            <MessageContextSource key={source.uri} context={source} />
          ))}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

function MessageContextSource ({ context }: { context: AppChatStreamSource }) {
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
