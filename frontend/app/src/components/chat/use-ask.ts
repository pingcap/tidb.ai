import { useChats } from '@/components/chat/chat-hooks';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

export function useAsk (onFinish?: () => void) {
  const { newChat, disabled } = useChats();
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [transition, startTransition] = useTransition();
  const [engine, setEngine] = useState<string>();
  const engineRef = useRef<string>();

  const ask = useCallback((message: string, options?: {
    headers?: Record<string, string>;
  }) => {
    setWaiting(true);
    startTransition(() => {
      newChat(undefined, undefined, { content: message, chat_engine: engineRef.current, headers: options?.headers })
        .once('created', chat => {
          setWaiting(false);
          startTransition(() => {
            router.push(`/c/${chat.id}`);
          });
        });
    });
  }, []);

  useEffect(() => {
    if (!waiting && !transition) {
      onFinish?.();
    }
  }, [waiting, transition]);

  return {
    ask,
    engine,
    disabled,
    setEngine: (engine: string | undefined) => {
      engineRef.current = engine;
      setEngine(engine);
    },
    loading: waiting || transition,
  };
}

export type UseAskReturns = ReturnType<typeof useAsk>;