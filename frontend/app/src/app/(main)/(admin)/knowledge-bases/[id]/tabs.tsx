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
          value="data-sources"
          onClick={() => startTransition(() => {
            router.push(`/knowledge-bases/${id}/data-sources`);
          })}
        >
          Data Sources
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
          disabled={true}
          value="retrieval-tester"
          onClick={() => startTransition(() => {
            router.push(`/knowledge-bases/${id}/retrieval-tester`);
          })}
        >
          Retrieval Tester
        </TabsTrigger>
        <TabsTrigger
          disabled={transitioning}
          value="knowledge-graph-explorer"
          onClick={() => startTransition(() => {
            router.push(`/knowledge-bases/${id}/knowledge-graph-explorer`);
          })}
        >
          Knowledge Graph Explorer
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