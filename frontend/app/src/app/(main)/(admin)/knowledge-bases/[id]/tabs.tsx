'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { useTransition } from 'react';

export function KnowledgeBaseTabs ({ id }: { id: number }) {
  const router = useRouter();
  const [transitioning, startTransition] = useTransition();
  const segments = useSelectedLayoutSegments();

  const segment = segments?.[0] ?? '';

  return (
    <Tabs value={segment}>
      <TabsList>
        <TabsTrigger
          disabled={transitioning}
          value=""
          onClick={() => startTransition(() => {
            router.push(`/knowledge-bases/${id}`);
          })}
        >
          Documents
        </TabsTrigger>
        <TabsTrigger
          disabled={transitioning}
          value="index-progress"
          onClick={() => startTransition(() => {
            router.push(`/knowledge-bases/${id}/index-progress`);
          })}
        >
          Index Progress
        </TabsTrigger>
        <TabsTrigger
          disabled={transitioning}
          value="settings"
          onClick={() => startTransition(() => {
            router.push(`/knowledge-bases/${id}/settings`);
          })}
        >
          Settings
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}