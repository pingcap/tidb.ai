'use client';

import { DataTableRemote } from '@/components/data-table-remote';
import { Status } from '@/components/status';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { DB } from '@/core/db/schema';
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';
import type { CellContext } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import type { Selectable } from 'kysely';

export default function TasksPage ({}: {}) {

  return (
    <div className="p-body">
      <DataTableRemote
        idColumn="id"
        selectable
        api="/api/v1/sources/tasks"
        columns={columns as any}
        batchOperations={(rows, revalidate) => (
          <Button variant="secondary" onClick={() => batchRetry(rows, revalidate)}>
            Retry
          </Button>
        )}
        refreshInterval={(page) => {
          if (!page) {
            return 5000;
          }
          if (page.data.find(item => ['processing', 'pending'].includes((item as any).status))) {
            return 2000;
          }
          return 5000;
        }}
      />
    </div>
  );
}

const datetime = (cell: CellContext<any, any>) => <time>{cell.getValue() ? format(cell.getValue(), 'yyyy-MM-dd HH:mm') : ''}</time>;
const url = (cell: CellContext<any, any>) => <a className="hover:underline" href={cell.getValue()} target="_blank">{cell.getValue()}</a>;

const helper = createColumnHelper<Selectable<DB['import_source_task']>>();
const columns = [
  helper.display({
    id: 'status',
    cell: props => {
      const { status, error } = props.row.original;
      switch (status) {
        case 'succeed':
          return <Status title="Succeed" status="green" />;
        case 'pending':
          return <Status title="Pending" status="gray" />;
        case 'failed':
          return (
            <Tooltip>
              <TooltipTrigger>
                <Status title="Failed" status="red" />
              </TooltipTrigger>
              <TooltipContent>
                <h6 className="font-semibold mb-2">Error message</h6>
                <ScrollArea className="w-80 h-40">
                  <pre className="text-xs">
                     {error}
                  </pre>
                  <ScrollBar orientation="horizontal" />
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </TooltipContent>
            </Tooltip>
          );
        case 'processing':
          return <Status title="Processing" status="blue" />;
      }
    },
  }),
  helper.accessor('type', {}),
  helper.accessor('url', { cell: url }),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('finished_at', { cell: datetime }),
];

const batchRetry = withToast(async (ids: string[], revalidate: () => void) => {
  const { updated } = await fetch('/api/v1/sources/tasks/operation/retry', {
    method: 'post',
    body: JSON.stringify({
      ids: ids.map(i => parseInt(i)),
    }),
  }).then(handleErrors)
    .then(res => res.json())
    .finally(() => {
      revalidate();
    });

  return updated;
}, {
  success: updated => `Rescheduled ${updated} tasks.`,
});
