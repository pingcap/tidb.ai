'use client';

import { ChatEngineProvider, MyChatProvider } from '@/components/chat/context';
import { ConversationMessageGroups } from '@/components/chat/conversation-message-groups';
import { useMyChat } from '@/components/chat/use-my-chat';
import { MessageInput } from '@/components/message-input';
import { SecuritySettingContext, withReCaptcha } from '@/components/security-setting-provider';
import { useSize } from '@/components/use-size';
import type { ChatMessage } from '@/core/repositories/chat';
import type { ChatEngineOptions } from '@/core/repositories/chat_engine';
import { cn } from '@/lib/utils';
import { type FormEvent, useContext } from 'react';

export interface ConversationProps {
  open: boolean;
  id: number;
  history: ChatMessage[];
  context: { ordinal: number, title: string, uri: string }[];
  engineOptions: ChatEngineOptions | null;
}

export function Conversation ({ id, open, history, context, engineOptions }: ConversationProps) {
  const myChat = useMyChat(id, history, context);
  const { handleInputChange, handleRegenerate, isWaiting, handleSubmit, input, isLoading, error, messages, reload } = myChat;
  const { ref, size } = useSize();

  const security = useContext(SecuritySettingContext);

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
    <MyChatProvider value={myChat}>
      <ChatEngineProvider value={engineOptions}>
        <div ref={ref} className={cn(
          'md:max-w-screen-md mx-auto space-y-4 transition-all relative md:min-h-screen md:p-body',
        )}>
          <ConversationMessageGroups history={history} />
          <div className="h-24"></div>
        </div>
        {size && open && <form className="block h-max p-4 fixed bottom-0" onSubmit={submitWithReCaptcha} style={{ left: size.x, width: size.width }}>
          <MessageInput className="w-full transition-all" disabled={isLoading} inputProps={{ value: input, onChange: handleInputChange, disabled: isLoading }} />
        </form>}
      </ChatEngineProvider>
    </MyChatProvider>
  );
}
