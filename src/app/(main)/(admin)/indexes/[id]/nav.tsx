'use client';

import { useIndex } from '@/app/(main)/(admin)/indexes/[id]/context';
import { Button } from '@/components/ui/button';
import type { IndexConfig } from '@/core/schema/indexes';
import { cn } from '@/lib/utils';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

export function IndexConfigNav () {
  const index = useIndex();
  const part = useSelectedLayoutSegment();
  const router = useRouter();

  const isGraph = index.config.provider === 'knowledge-graph';

  return (
    <nav className='my-4'>
      <ul className="flex gap-2 items-center">
        {(isGraph ? graphItems : items).map((item) => (
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

type NavItem<K> = { title: string, part: null | K, disabled?: boolean };
const items: NavItem<string>[] = [
  {
    title: 'General',
    part: null,
  },
  {
    title: 'Tasks',
    part: 'tasks',
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

const graphItems: NavItem<string>[] = [
  {
    title: 'General',
    part: null,
  },
  {
    title: 'Tasks',
    part: 'tasks',
  },
  {
    title: 'Graph Editor',
    part: 'graph-editor',
  },
  {
    title: 'Graph Entities',
    part: 'graph-entities',
  },
];
