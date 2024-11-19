'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import KnowledgeBaseEmptyState from '@/components/knowledge-base/empty-state';
import { useKnowledgeBases } from '@/components/knowledge-base/hooks';
import { KnowledgeBaseCard, KnowledgeBaseCardPlaceholder } from '@/components/knowledge-base/knowledge-base-card';
import { NextLink } from '@/components/nextjs/NextLink';
import type { PaginationState } from '@tanstack/table-core';
import { useState } from 'react';

export default function KnowledgeBasesPage () {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const { knowledgeBases, isLoading } = useKnowledgeBases(pagination.pageIndex, pagination.pageSize);

  return (
    <>
      <AdminPageHeading title="Knowledge Bases" />
      <NextLink href="/knowledge-bases/new">
        New Knowledge Base
      </NextLink>
      {
        isLoading
          ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"><KnowledgeBaseCardPlaceholder /></div>
          : !!knowledgeBases?.items.length
            ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {knowledgeBases?.items.map(kb => (
                <KnowledgeBaseCard key={kb.id} knowledgeBase={kb} />
              ))}
            </div>
            : <KnowledgeBaseEmptyState />
      }
    </>
  );
}

export const dynamic = 'force-dynamic';
