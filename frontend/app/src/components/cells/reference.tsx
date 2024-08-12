'use client';

import { getDatasource } from '@/api/datasources';
import { Skeleton } from '@/components/ui/skeleton';
import { getErrorMessage } from '@/lib/errors';
import { AlertTriangleIcon } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';

export function DatasourceCell ({ id }: { id: number }) {
  const { data: datasource, isLoading, error } = useSWR(`api.datasource.${id}`, () => getDatasource(id), {
    errorRetryCount: 0,
  });

  if (isLoading) {
    return <Skeleton className="rounded w-12 h-4" />;
  }

  if (datasource) {
    return <Link className='underline' href={`/datasources/${datasource.id}`}>{datasource.name}</Link>;
  }

  return <span className="flex items-center gap-1 text-yellow-500">
    <AlertTriangleIcon className="size-3" />
    {getErrorMessage(error)}
  </span>;
}