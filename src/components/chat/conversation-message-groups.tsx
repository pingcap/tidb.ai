import { useMyChatContext } from '@/components/chat/context';
import { DebugInfo } from '@/components/chat/debug-info';
import { MessageAnnotation } from '@/components/chat/message-annotation';
import { MessageContent } from '@/components/chat/message-content';
import { MessageContextSources } from '@/components/chat/message-content-sources';
import { MessageError } from '@/components/chat/message-error';
import { MessageHeading } from '@/components/chat/message-heading';
import { MessageOperations } from '@/components/chat/message-operations';
import { type ConversationMessageGroupProps, useGroupedConversationMessages } from '@/components/chat/use-grouped-conversation-messages';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { ChatMessage } from '@/core/repositories/chat';
import { getErrorMessage } from '@/lib/errors';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { AlertTriangleIcon } from 'lucide-react';
import { useState } from 'react';

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
    <section className="space-y-6 p-4 pt-12 border-b pb-10 last-of-type:border-b-0 last-of-type:border-pb-4">
      <Collapsible open={debugInfoOpen} onOpenChange={setDebugInfoOpen}>
        <div className="relative pr-12">
          <h2 className="text-2xl font-normal">{group.userMessage.content}</h2>
          <CollapsibleTrigger asChild>
            <Button className="absolute right-0 top-0 z-0 rounded-full" variant="ghost" size="sm">
              <InfoCircledIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <DebugInfo traceURL={group.assistantAnnotation.traceURL} />
        </CollapsibleContent>
      </Collapsible>

      <MessageContextSources group={group} />
      <section className="space-y-2">
        <MessageHeading />
        <MessageError group={group} />
        <MessageContent group={group} />
        {!group.finished && <MessageAnnotation group={group} />}
      </section>
      <MessageOperations group={group} />
    </section>
  );
}
