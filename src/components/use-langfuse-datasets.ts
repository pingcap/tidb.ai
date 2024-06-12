import { useUser } from '@/lib/auth';
import { fetcher } from '@/lib/fetch';
import type { LangfuseDatasetsResponse } from '@/lib/langfuse/types';
import useSWR from 'swr';

export function useLangfuseDatasets () {
  const user = useUser();
  const { data, isLoading, mutate } = useSWR(user?.role === 'admin' && ['get', '/api/v1/langfuse/datasets'], fetcher<LangfuseDatasetsResponse>);

  return {
    allDatasets: data?.data,
    isLoading,
    mutate,
  }
}
