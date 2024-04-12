'use client';

import { useIndex } from '@/app/(main)/(admin)/indexes/[id]/context';
import { Button } from '@/components/ui/button';
import type { IndexConfig } from '@/core/repositories/index_';
import { cn } from '@/lib/utils';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

export function IndexConfigNav () {
  const index = useIndex();
  const part = useSelectedLayoutSegment();
  const router = useRouter();

  return (
    <nav>
      <ul className="flex gap-2 items-center">
        {items.map((item) => (
          <li key={item.part}>
            <Button
              variant={item.part === part ? 'secondary' : 'ghost'}
              className={cn()}
              onClick={() => {
                router.push(`/indexes/${index.id}/${item.part ?? ''}`);
              }}
              disabled={item.disabled}
            >
              {item.title}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const items: { title: string, part: null | keyof IndexConfig, disabled?: boolean }[] = [
  {
    title: 'General',
    part: null,
  },
  {
    title: 'Reader',
    part: 'reader',
  },
  {
    title: 'Parser',
    part: 'parser',
  },
  {
    title: 'Metadata Extractors',
    part: 'metadata_extractors',
    disabled: true,
  },
  {
    title: 'LLM',
    part: 'llm',
  },
  {
    title: 'Embedding',
    part: 'embedding',
  },
];
