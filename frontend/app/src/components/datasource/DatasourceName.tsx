'use client';

import { useDatasource } from '@/components/datasource/hooks';
import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

export function DatasourceName ({ id }: { id: number }) {
  const { datasource, isLoading, isValidating } = useDatasource(id);

  if (isLoading) {
    return <Loader2Icon className="size-4 animate-spin repeat-infinite" />;
  }
  return <span className={cn(isValidating && 'opacity-50')}>{datasource?.name ?? '(Unknown Datasource)'}</span>;
}
