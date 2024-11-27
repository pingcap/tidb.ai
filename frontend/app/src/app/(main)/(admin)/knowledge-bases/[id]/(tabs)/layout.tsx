'use client';

import { KnowledgeBaseTabs } from '@/app/(main)/(admin)/knowledge-bases/[id]/(tabs)/tabs';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { ArrowRightIcon } from '@/components/icons';
import { useKnowledgeBase } from '@/components/knowledge-base/hooks';
import { SecondaryNavigatorLayout, SecondaryNavigatorList, SecondaryNavigatorMain } from '@/components/secondary-navigator-list';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertTriangleIcon, Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function KnowledgeBaseLayout ({ params, children }: { params: { id: string }, children: ReactNode }) {
  const id = parseInt(decodeURIComponent(params.id));
  const { knowledgeBase } = useKnowledgeBase(id);

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Knowledge Bases', url: '/knowledge-bases' },
          {
            title: (
              <span className="flex gap-1 items-center">
                {knowledgeBase?.data_sources_total === 0 && (
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertTriangleIcon className="size-4 text-yellow-600 dark:text-yellow-400" />
                      </TooltipTrigger>
                      <TooltipContent align="start">
                        <p>This Knowledge Base has no datasource.</p>
                        <Link className="underline flex gap-2 items-center" href={`/knowledge-bases/${id}/data-sources/new`}>
                          Create Data Source
                          <ArrowRightIcon className="size-4" />
                        </Link>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <span>
                  {knowledgeBase?.name ?? <Loader2Icon className="size-4 animate-spin repeat-infinite" />}
                </span>
              </span>
            ),
          },
        ]}
      />
      <SecondaryNavigatorLayout>
        <SecondaryNavigatorList>
          <KnowledgeBaseTabs knowledgeBaseId={id} />
        </SecondaryNavigatorList>
        <SecondaryNavigatorMain className="space-y-4 px-2">
          {children}
        </SecondaryNavigatorMain>
      </SecondaryNavigatorLayout>
    </>
  );
}