'use client';

import type { Chat, ChatMessage } from '@/api/chats';
import { ConversationMessageGroups } from '@/components/chat/conversation-message-groups';
import { __useHandleInitialMessage } from '@/components/chat/internal';
import { MessageInput } from '@/components/chat/message-input';
import { useChat } from '@/components/chat/use-chat';
import { SecuritySettingContext, withReCaptcha } from '@/components/security-setting-provider';
import { useSize } from '@/components/use-size';
import { cn } from '@/lib/utils';
import { type ChangeEvent, type FormEvent, useContext, useState } from 'react';

export interface ConversationProps {
  open: boolean;
  chat: Chat | undefined;
  history: ChatMessage[];
}

export function Conversation ({ open, chat, history }: ConversationProps) {
  const [waiting, setWaiting] = useState(false);
  let myChat = useChat({
    chat,
    messages: history,
    onChatCreated (id) {
      window.history.replaceState(null, '', `/c/${id}`);
    },
  });
  __useHandleInitialMessage(!chat, myChat, setWaiting);

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
      myChat.post({
        content: input,
        headers: {
          'X-Recaptcha-Token': token,
          'X-Recaptcha-Action': action,
        },
      });
      setInput('');
    });
  };

  myChat = { ...myChat, isLoading: waiting };

  return (
    <>
      <div ref={ref} className={cn(
        'md:max-w-screen-md mx-auto space-y-4 transition-all relative md:min-h-screen md:p-body',
      )}>
        <ConversationMessageGroups myChat={myChat} />
        <div className="h-24"></div>
      </div>
      {size && open && <form className="block h-max p-4 fixed bottom-0" onSubmit={submitWithReCaptcha} style={{ left: size.x, width: size.width }}>
        <MessageInput className="w-full transition-all" disabled={myChat.isLoading} inputProps={{ value: input, onChange: handleInputChange, disabled: myChat.isLoading }} />
      </form>}
    </>
  );
}
