import { getLlm } from '@/api/llms';
import useSWR from 'swr';

export function useLlm (id: number | null | undefined) {
  const { data: llm, ...rest } = useSWR(id == null ? null : `api.llms.get?id=${id}`, () => getLlm(id as number));
  return { llm, ...rest };
}
