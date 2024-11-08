import { useKB } from '@/app/(main)/(admin)/knowledge-bases/[id]/context';

export function useDatasource (id: number) {
  const { data_sources } = useKB();

  return data_sources.find(ds => ds.id === id);
}
