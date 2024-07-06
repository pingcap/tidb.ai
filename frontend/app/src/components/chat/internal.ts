import type { useChat } from '@/components/chat/use-chat';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const internalState: {
  message: string
} = {
  message: '',
};

export function __setMessage (msg: string) {
  internalState.message = msg;
}

export function __useHandleInitialMessage (isNew: boolean, chat: ReturnType<typeof useChat>, setWaiting: (waiting: boolean) => void) {
  const router = useRouter();
  const handled = useRef(!isNew);

  useEffect(() => {
    if (internalState.message) {
      setWaiting(true);
      chat.reset();
      void chat.post({ content: internalState.message }, () => {
        setWaiting(false);
      });
      window.document.title = internalState.message;
      internalState.message = '';
      handled.current = true;
    }

    if (isNew && !handled.current) {
      router.replace('/');
    }
  });
}
