import { useEffect, useSyncExternalStore } from 'react';

const PRELOAD_INTERVAL = 180_000;   // 3 minutes

export function usePreloadServerlessTiFlashReplicas () {
  const documentVisible = useSyncExternalStore(
    onStoreChange => {
      document.addEventListener('visibilitychange', onStoreChange);
      return () => {
        document.removeEventListener('visibilitychange', onStoreChange);
      };
    },
    () => document.visibilityState !== 'hidden',
    () => true);

  useEffect(() => {
    if (documentVisible) {
      preload();
      const h = setInterval(() => {
        preload();
      }, PRELOAD_INTERVAL);

      return () => {
        clearInterval(h);
      };
    }
  }, [documentVisible]);
}

const preload = () => {
  void fetch('/api/v1/documents/preload', {
    method: 'POST',
    cache: 'no-cache',
  }).catch(() => {});
}