'use client';

import { useIndex } from '@/app/(main)/(admin)/indexes/[id]/context';
import { EmbeddingConfigViewer } from '@/components/llamaindex/config/EmbeddingConfigViewer';
import { LlmConfigViewer } from '@/components/llamaindex/config/LLMConfigViewer';
import { ParserConfigViewer } from '@/components/llamaindex/config/ParserConfigViewer';
import { ReaderConfigViewer } from '@/components/llamaindex/config/ReaderConfigViewer';
import type {IndexConfig} from "@/core/config/indexes";
import type { PageProps } from '@/lib/next/types';

export default function Page ({ params }: PageProps<{ part: string }>) {
  const index = useIndex();

  switch (decodeURIComponent(params.part) as keyof IndexConfig) {
    case 'parser':
      return <ParserConfigViewer index={index} />;
    case 'reader':
      return <ReaderConfigViewer index={index} />;
    case 'llm':
      return <LlmConfigViewer index={index} />;
    case 'embedding':
      return <EmbeddingConfigViewer index={index} />;
  }
}
