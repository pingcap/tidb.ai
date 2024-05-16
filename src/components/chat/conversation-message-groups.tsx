import { useMyChatContext } from '@/components/chat/context';
import { MessageAnnotation } from '@/components/chat/message-annotation';
import { MessageContent } from '@/components/chat/message-content';
import { MessageContextSources } from '@/components/chat/message-content-sources';
import { MessageError } from '@/components/chat/message-error';
import { MessageHeading } from '@/components/chat/message-heading';
import { MessageOperations } from '@/components/chat/message-operations';
import { type ConversationMessageGroupProps, useGroupedConversationMessages } from '@/components/chat/use-grouped-conversation-messages';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {Button} from "@/components/ui/button";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import type { ChatMessage } from '@/core/repositories/chat';
import { getErrorMessage } from '@/lib/errors';
import {AlertTriangleIcon, BugIcon, InfoIcon} from 'lucide-react';
import {useState} from "react";

export function ConversationMessageGroups ({ history }: { history: ChatMessage[] }) {
  const { error, messages, isLoading, isWaiting } = useMyChatContext();
  const groups = useGroupedConversationMessages(history, messages, isLoading || isWaiting, error);

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
  const [debugInfoOpen, setDebugInfoOpen] = useState(false);
  return (
    <section className="space-y-6 p-4 border-b pb-10 last-of-type:border-b-0 last-of-type:border-pb-4">
      <Collapsible open={debugInfoOpen} onOpenChange={setDebugInfoOpen}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-normal">{group.userMessage.content}</h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <InfoIcon className="h-4 w-4"/>
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="line-clamp-1 text-xs p-y-4">
            <span className="font-medium">Tracing URL: </span>
            <a target="_blank" href={group.assistantAnnotation.traceURL}>{group.assistantAnnotation.traceURL}</a>
          </div>
          <div className="line-clamp-1 text-xs p-y-4">
            <span className="font-medium">Graph URL: </span>
            <a target="_blank" href={traceUrlToGraphUrl(group.assistantAnnotation.traceURL)}>{traceUrlToGraphUrl(group.assistantAnnotation.traceURL)}</a>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <MessageContextSources group={group} />
      <section className="space-y-2">
        <MessageHeading />
        <MessageError group={group} />
        <MessageContent group={group} />
        {!group.finished && <MessageAnnotation group={group}/>}
        </section>
      <MessageOperations group={group}/>
    </section>
);
}

function traceUrlToGraphUrl (url: string | undefined) {
  if (!url) {
    return undefined;
  }
  const tokens = url.split('/');
  const traceId = tokens[tokens.length - 1];
  return `https://tidb-ai-graph-editor.vercel.app/?langfuse_trace=${traceId}`;
}