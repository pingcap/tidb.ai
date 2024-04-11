import type { Index, IndexConfig } from '@/core/v1/index_';
import { fetcher } from '@/lib/fetch';
import { updateIndexConfigPart } from '@/operations/index_';
import { useCallback, useState } from 'react';
import useSWR from 'swr';

export function useIndexConfigPart<K extends keyof IndexConfig> (index: Index, part: K) {
  const { data, isLoading, mutate } = useSWR<IndexConfig[K]>(['get', `/api/v2/indexes/${index.id}/config/${part}`], {
    fetcher,
    revalidateOnMount: false,
    fallbackData: index.config[part],
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const update = useCallback((value: IndexConfig[K]) => {
    setIsUpdating(true);
    updateIndexConfigPart(index.id, part, value)
      .then(() => {
        try {
          index.config[part] = value;
        } catch {
        }
        return mutate(value, { revalidate: true });
      })
      .finally(() => setIsUpdating(false));
  }, [index.id, part]);

  return {
    data,
    update,
    isLoading,
    isUpdating,
  };
}
