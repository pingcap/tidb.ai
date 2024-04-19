import { __setMessage } from '@/app/(main)/(public)/c/[id]/internal';
import { createChat } from '@/client/operations/chats';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';
import { mutate } from 'swr';

export function useAsk (onFinish?: () => void) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [transitioning, startTransition] = useTransition();

  const ask = useCallback((message: string, options?: {
    engine?: number;
    headers?: Record<string, string>;
  }) => {
    startTransition(() => {
      setLoading(true);
      createChat({
        name: message,
        engine: options?.engine,
      })
        .then(chat => {
          __setMessage(message);
          startTransition(() => {
            onFinish?.();
            router.push(`/c/${encodeURIComponent(chat.url_key)}`);
          });
        })
        .finally(() => {
          setLoading(false);
          void mutate(['get', '/api/v1/chats']);
        });
    });
  }, []);

  const disabled = loading || transitioning;

  return {
    ask,
    loading: disabled,
  };
}

export type UseAskReturns = ReturnType<typeof useAsk>;