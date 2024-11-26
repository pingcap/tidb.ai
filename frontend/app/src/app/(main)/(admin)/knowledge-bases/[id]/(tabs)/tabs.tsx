'use client';

import type { KnowledgeBase } from '@/api/knowledge-base';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { useTransition } from 'react';

export function KnowledgeBaseTabs ({ knowledgeBase }: { knowledgeBase: KnowledgeBase }) {
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
            router.push(`/knowledge-bases/${knowledgeBase.id}`);
          })}
        >
          Documents
          <span className="ml-2 text-xs font-normal">
            {knowledgeBase.documents_total}
          </span>
        </TabsTrigger>
        <TabsTrigger
          disabled={transitioning}
          value="data-sources"
          onClick={() => startTransition(() => {
            router.push(`/knowledge-bases/${knowledgeBase.id}/data-sources`);
          })}
        >
          Data Sources
          <span className="ml-2 text-xs font-normal">
            {knowledgeBase.data_sources.length}
          </span>
        </TabsTrigger>
        <TabsTrigger
          disabled={transitioning}
          value="index-progress"
          onClick={() => startTransition(() => {
            router.push(`/knowledge-bases/${knowledgeBase.id}/index-progress`);
          })}
        >
          Index Progress
        </TabsTrigger>
        {/*<TabsTrigger*/}
        {/*  disabled={true}*/}
        {/*  value="retrieval-tester"*/}
        {/*  onClick={() => startTransition(() => {*/}
        {/*    router.push(`/knowledge-bases/${knowledgeBase.id}/retrieval-tester`);*/}
        {/*  })}*/}
        {/*>*/}
        {/*  Retrieval Tester*/}
        {/*</TabsTrigger>*/}
        <TabsTrigger
          disabled={transitioning}
          value="knowledge-graph-explorer"
          onClick={() => startTransition(() => {
            router.push(`/knowledge-bases/${knowledgeBase.id}/knowledge-graph-explorer`);
          })}
        >
          Graph Explorer
        </TabsTrigger>
        <TabsTrigger
          disabled={transitioning}
          value="settings"
          onClick={() => startTransition(() => {
            router.push(`/knowledge-bases/${knowledgeBase.id}/settings`);
          })}
        >
          Settings
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}