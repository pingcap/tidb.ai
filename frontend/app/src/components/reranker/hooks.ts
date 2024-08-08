import { getReranker } from '@/api/rerankers';
import useSWR from 'swr';

export function useReranker (id: number | null | undefined) {
  const { data: reranker, ...rest } = useSWR(id == null ? null : `api.rerankers.get?id=${id}`, () => getReranker(id as number));
  return { reranker, ...rest };
}
