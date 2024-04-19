import type { useChat } from 'ai/react';
import { useEffect } from 'react';

const internalState: {
  message: string
} = {
  message: '',
};

export function __setMessage (msg: string) {
  internalState.message = msg;
}

export function __useHandleInitialMessage (chat: ReturnType<typeof useChat>, setWaiting: (waiting: boolean) => void) {
  useEffect(() => {
    if (internalState.message) {
      setWaiting(true);
      chat
        .append({ id: 'good-question', content: internalState.message, role: 'user' })
        .finally(() => setWaiting(false));
      internalState.message = '';
    }
  });
}
