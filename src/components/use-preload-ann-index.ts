import { useEffect, useSyncExternalStore } from 'react';

const TRIGGER_PRELOAD_ANN_INDEX_INTERVAL = 2 * 60 * 1000;   // 2 minutes

export function usePreloadANNIndex (indexName: string = 'default') {
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
      // Skip ANN index preload if disabled.
      if (!Boolean(process.env.PUBLIC_ENABLE_ANN_INDEX_PRELOAD ?? true)) return;

      // Preload TiFlash replicas periodically.
      triggerANNIndexPreload(indexName);
      const h = setInterval(() => {
        triggerANNIndexPreload(indexName);
      }, TRIGGER_PRELOAD_ANN_INDEX_INTERVAL);

      return () => {
        clearInterval(h);
      };
    }
  }, [documentVisible, indexName]);
}

const triggerANNIndexPreload = (indexName: string) => {
  void fetch(`/api/v1/indexes/${indexName}/preload`, {
    method: 'POST',
    cache: 'no-cache',
  }).catch(() => {});
}