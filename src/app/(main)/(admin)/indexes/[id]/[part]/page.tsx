'use client';

import { useIndex } from '@/app/(main)/(admin)/indexes/[id]/context';
import { EmbeddingConfigViewer } from '@/components/llamaindex/config/EmbeddingConfigViewer';
import { LlmConfigViewer } from '@/components/llamaindex/config/LLMConfigViewer';
import { ParserConfigViewer } from '@/components/llamaindex/config/ParserConfigViewer';
import { ReaderConfigViewer } from '@/components/llamaindex/config/ReaderConfigViewer';
import { Skeleton } from '@/components/ui/skeleton';
import type { IndexConfig } from '@/core/schema/indexes';
import type { PageProps } from '@/lib/next/types';
import dynamic from 'next/dynamic';
import { type ReactElement, Suspense } from 'react';

const GraphEditor = dynamic(() => import('@/components/graph/GraphEditor').then(m => m.GraphEditor), { ssr: false });

export default function Page ({ params }: PageProps<{ part: string }>) {
  const index = useIndex();

  if (index.config.provider === 'llamaindex') {
    let el: ReactElement | undefined;
    switch (decodeURIComponent(params.part) as keyof IndexConfig) {
      case 'parser':
        el = <ParserConfigViewer index={index} />;
        break;
      case 'reader':
        el = <ReaderConfigViewer index={index} />;
        break;
      case 'llm':
        el = <LlmConfigViewer index={index} />;
        break;
      case 'embedding':
        el = <EmbeddingConfigViewer index={index} />;
        break;
    }

    return (
      <div className="lg:max-w-[50vw] p-4">
        {el}
      </div>
    );
  } else if (index.config.provider === 'knowledge-graph') {
    switch (params.part as 'graph-editor') {
      case 'graph-editor':
        return (
          <Suspense fallback={<Skeleton className="block w-4 h-20 rounded" />}>
            <GraphEditor />
          </Suspense>
        );
    }
  }
}
