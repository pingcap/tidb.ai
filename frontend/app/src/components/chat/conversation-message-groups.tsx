import { type SubscribedChat, useChatMessage } from '@/components/chat/chat-controller-provider';
import { AppChatStreamState } from '@/components/chat/chat-stream-state';
import { DebugInfo } from '@/components/chat/debug-info';
import { MessageAnnotation } from '@/components/chat/message-annotation';
import { MessageContent } from '@/components/chat/message-content';
import { MessageContextSources } from '@/components/chat/message-content-sources';
import { MessageError } from '@/components/chat/message-error';
import { MessageHeading } from '@/components/chat/message-heading';
import { MessageOperations } from '@/components/chat/message-operations';
import { type MyConversationMessageGroup, useGroupedConversationMessages } from '@/components/chat/use-grouped-conversation-messages';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { InfoIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import './conversation-message-groups.scss';

export function ConversationMessageGroups ({ subscribedChat }: { subscribedChat: SubscribedChat }) {
  const groups = useGroupedConversationMessages(subscribedChat.messages);

  useEffect(() => {
    const scroll = () => {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    };
    if (subscribedChat.pendingPost) {
      scroll();
      return () => {
        scroll();
      };
    }
  }, [subscribedChat.pendingPost]);

  return (
    <div className="space-y-8 pb-16">
      {groups.map((group, index) => (
        <ConversationMessageGroup
          key={group.id}
          group={group}
          subscribedChat={subscribedChat}
        />
      ))}
      {subscribedChat.pendingPost && (
        <section
          className={cn('opacity-50 pointer-events-none space-y-6 p-4 pt-12 border-b pb-10 last-of-type:border-b-0 last-of-type:border-pb-4')}
        >
          <div className="relative pr-12">
            <h2 className="text-2xl font-normal">{subscribedChat.pendingPost.content}</h2>
          </div>
        </section>
      )}
    </div>
  );
}

function ConversationMessageGroup ({ group, subscribedChat }: { group: MyConversationMessageGroup, subscribedChat: SubscribedChat }) {
  const enableDebug = !process.env.NEXT_PUBLIC_DISABLE_DEBUG_PANEL && !!group.id;
  const userMessage = useChatMessage(group.userMessage);
  const assistantMessage = useChatMessage(group.assistantMessage);

  group = {
    ...group,
    userMessage,
    assistantMessage,
  };

  const [debugInfoOpen, setDebugInfoOpen] = useState(false);
  const [highlight, setHighlight] = useState(false);
  useEffect(() => {
    if (location.hash.slice(1) === String(group.assistantMessage.id)) {
      setHighlight(true);
      document.getElementById(String(group.assistantMessage.id))?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, []);

  return (
    <section
      id={String(group.assistantMessage.id)}
      className={cn('space-y-6 p-4 pt-12 border-b pb-10 last-of-type:border-b-0 last-of-type:border-pb-4', highlight && 'animate-highlight')}
      onAnimationEnd={() => setHighlight(false)}
    >
      <Collapsible open={debugInfoOpen} onOpenChange={setDebugInfoOpen}>
        <div className="relative pr-12">
          <h2 className="text-2xl font-normal">{group.userMessage.content}</h2>
          {enableDebug && <CollapsibleTrigger asChild>
            <Button className="absolute right-0 top-0 z-0 rounded-full" variant="ghost" size="sm">
              <InfoIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>}
        </div>
        <CollapsibleContent>
          <DebugInfo group={group} chat={subscribedChat.chat} />
        </CollapsibleContent>
      </Collapsible>

      <MessageContextSources message={group.assistantMessage} />
      <section className="space-y-2">
        <MessageHeading />
        {!group.finished && <MessageError message={group.assistantMessage} ongoing={group.ongoing} />}
        <MessageContent message={group.assistantMessage} />
        {!group.finished
          && group.ongoing.state !== AppChatStreamState.UNKNOWN
          && !assistantMessage.error
          && <MessageAnnotation state={group.ongoing} />}
      </section>
      {group.finished && <MessageOperations message={group.assistantMessage} controller={subscribedChat.controller} />}
    </section>
  );
}
