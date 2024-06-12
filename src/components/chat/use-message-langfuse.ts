import { useLangfuseDatasets } from '@/components/use-langfuse-datasets';
import { useUser } from '@/lib/auth';
import { fetcher, handleErrors } from '@/lib/fetch';
import type { LangfuseDatasetsResponse } from '@/lib/langfuse/types';
import useSWR from 'swr';

export interface UseMessageLangfuseReturns {
  datasets: string[] | undefined;
  allDatasets: LangfuseDatasetsResponse['data'] | undefined;
  isLoading: boolean;

  addToDataset (name: string): Promise<void>;
}

export function useMessageLangFuse (chatId: number, messageId: number, traceId: string | undefined, enabled: boolean): UseMessageLangfuseReturns {
  const user = useUser();

  const { data: datasets, isLoading, mutate } = useSWR((traceId && enabled && user?.role === 'admin') ? ['get', `/api/v1/chats/${chatId}/messages/${messageId}/trace/datasets`] : undefined, fetcher<string[]>);
  const { allDatasets, isLoading: isAllDatasetsLoading, mutate: mutateAllDatasets } = useLangfuseDatasets();

  return {
    datasets,
    allDatasets,
    isLoading: isLoading || isAllDatasetsLoading,
    addToDataset: async name => {
      const createdItem = await fetch(`/api/v1/langfuse/datasets/${name}/items`, {
        method: 'post',
        body: JSON.stringify({
          traceId,
        }),
      }).then(handleErrors).then(res => res.json());

      mutate(prev => {
        if (prev) {
          if (!prev.includes(name)) {
            return [...prev, name];
          }
        }
        return prev;
      });
      mutateAllDatasets(prev => {
        if (!prev) {
          return prev;
        }
        let { data, ...rest } = prev;
        data = prev.data.map(item => {
          if (item.name === name) {
            item = { ...item };
            if (!item.items.includes(createdItem.id)) {
              item.items = [...item.items, createdItem.id];
            }
          }
          return item;
        });
        return { data, ...rest };
      });
    },
  };
}