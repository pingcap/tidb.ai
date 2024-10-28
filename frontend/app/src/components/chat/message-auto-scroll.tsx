'use client';

import type { ChatMessage } from '@/api/chats';
import { useRequestScroll } from '@/components/auto-scroll';
import type { ChatMessageController, OngoingState } from '@/components/chat/chat-message-controller';
import { AppChatStreamState, type StackVMState } from '@/components/chat/chat-stream-state';
import { useEffect } from 'react';

export function MessageAutoScroll ({ message }: { message: ChatMessageController }) {
  const requestScroll = useRequestScroll();

  useEffect(() => {
    let handler1: any;
    let handler2: any;

    message.on('stream-update', handler1 = (_: ChatMessage, ongoing: OngoingState<AppChatStreamState | StackVMState>) => {
      if (ongoing.state === AppChatStreamState.GENERATE_ANSWER) {
        requestScroll('bottom');
      }
    });

    message.once('stream-finished', handler2 = () => {
      message.off('stream-update', handler1);
    });

    return () => {
      message.off('stream-update', handler1);
      message.off('stream-finished', handler2);
    };
  }, [message]);

  return null;
}