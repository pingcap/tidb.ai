import { getKnowledgeBaseById, getKnowledgeGraphIndexProgress, listKnowledgeBases } from '@/api/knowledge-base';
import { useKB } from '@/app/(main)/(admin)/knowledge-bases/[id]/context';
import useSWR from 'swr';

export function useKnowledgeBase (id: number | null | undefined) {
  const { data: knowledgeBase, ...rest } = useSWR(id != null && `api.knowledge-bases.get?id=${id}`, () => getKnowledgeBaseById(id!))
  return { knowledgeBase, ...rest }
}

export function useKnowledgeBaseDatasource (id: number) {
  const { data_sources } = useKB();

  return data_sources.find(ds => ds.id === id);
}

export function useKnowledgeBaseIndexProgress (id: number) {
  const { data: progress, ...rest } = useSWR(`api.knowledge-base.${id}.index-progress`, () => getKnowledgeGraphIndexProgress(id));
  return { progress, ...rest };
}

export function useKnowledgeBases (pageIndex: number, pageSize: number) {
  const { data: knowledgeBases, ...rest } = useSWR(`api.knowledge-bases.list?page=${pageIndex}&size=${pageSize}`, () => listKnowledgeBases({ page: pageIndex + 1, size: pageSize }), {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    focusThrottleInterval: 1000,
    keepPreviousData: true,
  });

  return {
    knowledgeBases,
    ...rest,
  };
}
