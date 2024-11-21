'use client';

import { useKnowledgeBase } from '@/components/knowledge-base/hooks';

export function KBInfo ({ className, detailed = false, id }: { className?: string, detailed?: boolean, id: number | undefined | null }) {
  const { knowledgeBase, isLoading } = useKnowledgeBase(id);

  return (
    <span>{knowledgeBase?.name}</span>
  );
}
