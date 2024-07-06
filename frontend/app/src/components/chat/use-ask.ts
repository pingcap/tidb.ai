import { __setMessage } from '@/components/chat/internal';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

export function useAsk (onFinish?: () => void) {
  const router = useRouter();
  const [transition, startTransition] = useTransition();
  const [engine, setEngine] = useState<number>();
  const engineRef = useRef<number>();

  const ask = useCallback((message: string, options?: {
    engine?: number;
    headers?: Record<string, string>;
  }) => {
    __setMessage(message);
    startTransition(() => {
      router.push(`/c/new`);
    });

  }, []);

  useEffect(() => {
    if (!transition) {
      onFinish?.();
    }
  }, [transition]);

  return {
    ask,
    engine,
    setEngine: (engine: number | undefined) => {
      engineRef.current = engine;
      setEngine(engine);
    },
    loading: transition,
  };
}

export type UseAskReturns = ReturnType<typeof useAsk>;