import { useEffect, useSyncExternalStore } from 'react';

const TRIGGER_PRELOAD_ANN_INDEX_INTERVAL = 2 * 60 * 1000;   // 2 minutes

export function usePreloadANNIndex (indexId: number = 1) {
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
      if (Boolean(process.env.PUBLIC_ENABLE_ANN_INDEX_PRELOAD)) return;

      // Preload TiFlash replicas periodically.
      triggerANNIndexPreload(indexId);
      const h = setInterval(() => {
        triggerANNIndexPreload(indexId);
      }, TRIGGER_PRELOAD_ANN_INDEX_INTERVAL);

      return () => {
        clearInterval(h);
      };
    }
  }, [documentVisible, indexId]);
}

const triggerANNIndexPreload = (indexId: number) => {
  void fetch(`/api/v2/index/${indexId}/preload`, {
    method: 'POST',
    cache: 'no-cache',
  }).catch(() => {});
}