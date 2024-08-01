import { useChats } from '@/components/chat/chat-hooks';
import { useRecaptchaExecute } from '@/components/recaptcha';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

export function useAsk (onFinish?: () => void) {
  const { newChat } = useChats();
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [transition, startTransition] = useTransition();
  const [engine, setEngine] = useState<string>();
  const engineRef = useRef<string>();

  const recaptchaExecute = useRecaptchaExecute();

  const ask = useCallback((message: string) => {
    setWaiting(true);
    recaptchaExecute('chat').then(token => {
      newChat(undefined, undefined, {
        content: message,
        chat_engine: engineRef.current,
        recaptchaToken: token,
      })
        .once('created', chat => {
          setWaiting(false);
          startTransition(() => {
            router.push(`/c/${chat.id}`);
          });
        })
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
    setEngine: (engine: string | undefined) => {
      engineRef.current = engine;
      setEngine(engine);
    },
    loading: waiting || transition,
  };
}

export type UseAskReturns = ReturnType<typeof useAsk>;