'use client';

import { useReranker } from '@/components/reranker/hooks';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';

export function RerankerInfo ({ reverse = false, id }: { reverse?: boolean, id: number | undefined | null }) {
  const { reranker, isLoading } = useReranker(id);

  if (isLoading) {
    return <Loader2Icon className="size-4 animate-spin repeat-infinite" />;
  }

  if (!reranker) {
    return <Badge variant='outline' className="text-muted-foreground">Default Reranker Model</Badge>;
  }

  return (
    <span className={cn('flex gap-1 items-center', reverse && 'flex-row-reverse')}>
      <Badge variant="secondary"><span className="font-bold">{reranker.provider}</span>:<span className="opacity-50">{reranker.model}</span></Badge>
      <Link className={badgeVariants()} href={`/reranker-models/${reranker.id}`}>{reranker.name}</Link>
    </span>
  );
}
