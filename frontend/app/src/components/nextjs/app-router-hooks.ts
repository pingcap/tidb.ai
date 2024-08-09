import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useMemo, useTransition } from 'react';

export function useRefresh () {
  const [refreshing, startTransition] = useTransition();
  const router = useRouter();

  const refresh = useMemo(() => () => {
    startTransition(router.refresh);
  }, [router]);

  return [refreshing, refresh] as const;
}

export function usePush (refresh = false) {
  const [navigating, startTransition] = useTransition();
  const router = useRouter();

  const push = useMemo(() => (href: string, options?: NavigateOptions) => {
    startTransition(() => {
      router.push(href, options);
      if (refresh) {
        router.refresh();
      }
    });
  }, [router, refresh]);

  return [navigating, push] as const;
}

export function useReplace (refresh = false) {
  const [navigating, startTransition] = useTransition();
  const router = useRouter();

  const replace = useMemo(() => (href: string, options?: NavigateOptions) => {
    startTransition(() => {
      router.replace(href, options);
      if (refresh) {
        router.refresh();
      }
    });
  }, [router, refresh]);

  return [navigating, replace] as const;
}
