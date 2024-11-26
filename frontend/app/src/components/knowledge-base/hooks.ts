import { getKnowledgeGraphIndexProgress, listKnowledgeBases } from '@/api/knowledge-base';
import { listAllHelper } from '@/lib/request';
import useSWR from 'swr';

export function useKnowledgeBaseIndexProgress (id: number) {
  const { data: progress, ...rest } = useSWR(`api.knowledge-base.${id}.index-progress`, () => getKnowledgeGraphIndexProgress(id));
  return { progress, ...rest };
}

export function useAllKnowledgeBases (flag = true) {
  return useSWR(flag && `api.knowledge-bases.list-all`, () => listAllHelper(listKnowledgeBases, 'id'));
}
