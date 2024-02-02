'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { taskStatusCell } from '@/components/cells/task-status';
import { ImportTaskStatusFilter } from '@/components/data-filters/task-status-filter';
import { DataTableHeading } from '@/components/data-table-heading';
import { DataTableRemote } from '@/components/data-table-remote';
import { Button } from '@/components/ui/button';
import type { DB } from '@/core/db/schema';
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';
import type { CellContext } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import type { Selectable } from 'kysely';

export default function TasksPage ({}: {}) {

  return (
    <>
      <AdminPageHeading title="Importing tasks" />
      <DataTableRemote
        before={
          <DataTableHeading>
            <ImportTaskStatusFilter />
            <span className="ml-auto" />
          </DataTableHeading>
        }
        idColumn="id"
        selectable
        api="/api/v1/sources/tasks"
        columns={columns as any}
        batchOperations={(rows, revalidate) => (
          <Button variant="secondary" onClick={() => batchRetry(rows, revalidate)}>
            Retry
          </Button>
        )}
      />
    </>
  );
}

const datetime = (cell: CellContext<any, any>) => <time>{cell.getValue() ? format(cell.getValue(), 'yyyy-MM-dd HH:mm') : ''}</time>;
const url = (cell: CellContext<any, any>) => <a className="hover:underline" href={cell.getValue()} target="_blank">{cell.getValue()}</a>;

const helper = createColumnHelper<Selectable<DB['import_source_task']>>();
const columns = [
  helper.accessor('status', { cell: taskStatusCell }),
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
