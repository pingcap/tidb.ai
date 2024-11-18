'use client';

import { listKnowledgeBases } from '@/api/knowledge-base';
import { AdminPageHeading } from '@/components/admin-page-heading';
import KnowledgeBaseEmptyState from '@/components/knowledge-base/empty-state';
import { KnowledgeBaseCard, KnowledgeBaseCardPlaceholder } from '@/components/knowledge-base/knowledge-base-card';
import { NextLink } from '@/components/nextjs/NextLink';
import type { PaginationState } from '@tanstack/table-core';
import { useState } from 'react';
import useSWR from 'swr';

export default function KnowledgeBasesPage () {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const { data, mutate, isLoading, isValidating } = useSWR(`api.knowledge-bases.list?page=${pagination.pageIndex}&size=${pagination.pageSize}`, () => listKnowledgeBases({ page: pagination.pageIndex + 1, size: pagination.pageSize }), {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    focusThrottleInterval: 1000,
    keepPreviousData: true,
    onError: console.error,
  });

  return (
    <>
      <AdminPageHeading title="Knowledge Bases" />
      <NextLink href="/knowledge-bases/new">
        New Knowledge Base
      </NextLink>
      {
        isLoading
          ? <div className="grid grid-cols-3 gap-4"><KnowledgeBaseCardPlaceholder /></div>
          : !!data?.items.length
            ? <div className="grid grid-cols-3 gap-4">
              {data?.items.map(kb => (
                <KnowledgeBaseCard key={kb.id} knowledgeBase={kb} />
              ))}
            </div>
            : <KnowledgeBaseEmptyState />
      }
    </>
  );
}

export const dynamic = 'force-dynamic';
