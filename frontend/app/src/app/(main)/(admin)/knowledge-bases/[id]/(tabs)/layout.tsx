import { KnowledgeBaseTabs } from '@/app/(main)/(admin)/knowledge-bases/[id]/(tabs)/tabs';
import { cachedGetKnowledgeBaseById } from '@/app/(main)/(admin)/knowledge-bases/[id]/api';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { ArrowRightIcon } from '@/components/icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertTriangleIcon } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default async function KnowledgeBaseLayout ({ params, children }: { params: { id: string }, children: ReactNode }) {
  const id = parseInt(decodeURIComponent(params.id));
  const kb = await cachedGetKnowledgeBaseById(id);

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Knowledge Bases', url: '/knowledge-bases' },
          {
            title: (
              <span className="flex gap-1 items-center">
                {!kb.data_sources.length && (
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
                  {kb.name}
                </span>
              </span>
            ),
          },
        ]}
      />
      <KnowledgeBaseTabs knowledgeBase={kb} />
      {children}
    </>
  );
}