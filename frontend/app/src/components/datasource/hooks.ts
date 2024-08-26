import { getDatasource, getDatasourceOverview } from '@/api/datasources';
import useSWR from 'swr';

export function useDatasource (id: number) {
  const { data: datasource, ...rest } = useSWR(`api.datasource.${id}`, () => getDatasource(id));

  return { datasource, ...rest };
}

export function useDatasourceProgress (id: number) {
  const { data: progress, ...rest } = useSWR(`api.datasource.${id}.get-overview`, () => getDatasourceOverview(id));
  return { progress, ...rest };
}