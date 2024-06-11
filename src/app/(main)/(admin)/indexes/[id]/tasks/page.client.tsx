'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { taskStatusCell } from '@/components/cells/index-task-status';
import { metadataCell } from '@/components/cells/metadata';
import { IndexTaskStatusFilter } from '@/components/data-filters/index-task-status-filter';
import { DataTableHeading } from '@/components/data-table-heading';
import { DataTableRemote } from '@/components/data-table-remote';
import type { DocumentIndexTask } from '@/core/repositories/document_index_task';
import type { CellContext } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';

export default function TasksPage ({ indexId }: { indexId: number }) {
  return (
    <>
      <AdminPageHeading title="Indexing tasks" />
      <DataTableRemote
        before={
          <DataTableHeading>
            <IndexTaskStatusFilter />
            <span className="ml-auto" />
          </DataTableHeading>
        }
        idColumn="id"
        api={`/api/v1/tasks/document_index?index_id=${indexId}`}
        columns={columns as any}
      />
    </>
  );
}

const datetime = (cell: CellContext<any, any>) => <time>{cell.getValue() ? format(cell.getValue(), 'yyyy-MM-dd HH:mm') : ''}</time>;

const helper = createColumnHelper<DocumentIndexTask>();
const columns = [
  helper.accessor('id', { header: 'Task ID' }),
  helper.accessor('index_id', { header: 'Index ID' }),
  helper.accessor('status', { cell: taskStatusCell }),
  helper.accessor('type', {}),
  helper.accessor('document_id', {}),
  helper.accessor('info', { cell: metadataCell }),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('ended_at', { cell: datetime }),
];
