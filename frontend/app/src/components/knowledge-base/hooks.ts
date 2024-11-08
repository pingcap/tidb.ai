import { getKnowledgeGraphIndexProgress } from '@/api/knowledge-base';
import useSWR from 'swr';

export function useKnowledgeBaseIndexProgress (id: number) {
  const { data: progress, ...rest } = useSWR(`api.knowledge-base.${id}.index-progress`, () => getKnowledgeGraphIndexProgress(id));
  return { progress, ...rest };
}
