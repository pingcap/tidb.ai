'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { taskStatusCell } from '@/components/cells/import-task-status';
import { ImportTaskStatusFilter } from '@/components/data-filters/task-status-filter';
import { DataTableHeading } from '@/components/data-table-heading';
import { DataTableRemote } from '@/components/data-table-remote';
import { Button } from '@/components/ui/button';
import type { DocumentImportTask } from '@/core/repositories/source';
import { batchRetry } from '@/client/operations/batchRetry';
import type { CellContext } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';

export default function TasksPage ({}: {}) {

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Documents', url: '/documents' },
          { title: 'Importing Tasks' },
        ]}
      />
      <DataTableRemote
        before={
          <DataTableHeading>
            <ImportTaskStatusFilter />
            <span className="ml-auto" />
          </DataTableHeading>
        }
        idColumn="id"
        selectable
        api="/api/v1/tasks/document_import"
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

const helper = createColumnHelper<DocumentImportTask>();
const columns = [
  helper.accessor('id', { header: 'Task ID' }),
  helper.accessor('status', { cell: taskStatusCell }),
  helper.accessor('type', {}),
  helper.accessor('url', { cell: url }),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('finished_at', { cell: datetime }),
];
