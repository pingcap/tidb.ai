'use client';

import type { Chat, ChatMessage } from '@/api/chats';
import { ChatControllerProvider, type SubscribedChat, useSubscribeChat } from '@/components/chat/chat-controller-provider';
import { ConversationMessageGroups } from '@/components/chat/conversation-message-groups';
import { MessageInput } from '@/components/chat/message-input';
import { SecuritySettingContext, withReCaptcha } from '@/components/security-setting-provider';
import { useSize } from '@/components/use-size';
import { cn } from '@/lib/utils';
import { type ChangeEvent, type FormEvent, type ReactNode, useContext, useState } from 'react';

export interface ConversationProps {
  chatId?: string;

  className?: string;
  open: boolean;
  chat: Chat | undefined;
  history: ChatMessage[];

  /* Only for widgets */
  placeholder?: (myChat: SubscribedChat) => ReactNode;
  preventMutateBrowserHistory?: boolean;
  preventShiftMessageInput?: boolean;
}

export function Conversation ({ open, chat, chatId, history, placeholder, preventMutateBrowserHistory = false, preventShiftMessageInput = false, className }: ConversationProps) {
  const subscribedChat = useSubscribeChat(chatId, chat, history);

  const [input, setInput] = useState('');
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const { ref, size } = useSize();

  const security = useContext(SecuritySettingContext);

  const submitWithReCaptcha = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    withReCaptcha({
      action: 'chat',
      siteKey: security?.google_recaptcha_site_key || '',
      mode: security?.google_recaptcha,
    }, ({ token, action }) => {
      subscribedChat.controller.post({
        content: input,
        headers: {
          'X-Recaptcha-Token': token,
          'X-Recaptcha-Action': action,
        },
      });
      setInput('');
    });
  };

  const disabled = !!subscribedChat.pendingPost || !!subscribedChat.ongoingMessageController;

  return (
    <ChatControllerProvider controller={subscribedChat.controller}>
      {!subscribedChat.messages.length && !subscribedChat.ongoingMessageController && placeholder?.(subscribedChat)}
      <div ref={ref} className={cn(
        'mx-auto space-y-4 transition-all relative md:max-w-screen-md md:min-h-screen md:p-body',
        className,
      )}>
        <ConversationMessageGroups subscribedChat={subscribedChat} />
        <div className="h-24"></div>
      </div>
      {size && open && <form className={cn('block h-max p-4 fixed bottom-0', preventShiftMessageInput && 'absolute pb-0')} onSubmit={submitWithReCaptcha} style={{ left: preventShiftMessageInput ? 0 : size.x, width: size.width }}>
        <MessageInput className="w-full transition-all" disabled={disabled} inputProps={{ value: input, onChange: handleInputChange, disabled }} />
      </form>}
    </ChatControllerProvider>
  );
}
