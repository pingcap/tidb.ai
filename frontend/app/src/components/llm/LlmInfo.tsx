'use client';

import { useLlm } from '@/components/llm/hooks';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';

export function LlmInfo ({ reverse = false, id }: { reverse?: boolean, id: number | undefined | null }) {
  const { llm, isLoading } = useLlm(id);

  if (isLoading) {
    return <Loader2Icon className='size-4 animate-spin repeat-infinite'/>
  }

  if (!llm) {
    return <span className='text-muted-foreground'>--</span>;
  }

  return (
    <span className={cn('flex gap-1 items-center', reverse && 'flex-row-reverse')}>
      <Badge variant="secondary"><span className='font-bold'>{llm.provider}</span>:<span className='opacity-50'>{llm.model}</span></Badge>
      <Link className={badgeVariants()} href={`/llms/${llm.id}`}>{llm.name}</Link>
    </span>
  );
}
