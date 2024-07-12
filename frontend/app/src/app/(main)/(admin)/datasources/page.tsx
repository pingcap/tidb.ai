'use client';

import { type Datasource, listDataSources } from '@/api/datasources';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { datetime } from '@/components/cells/datetime';
import { DataTableHeading } from '@/components/data-table-heading';
import { DataTableRemote } from '@/components/data-table-remote';
import { buttonVariants } from '@/components/ui/button';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

const helper = createColumnHelper<Datasource>();

const mono = (cell: CellContext<any, any>) => <span className="font-mono">{cell.getValue()}</span>;

const columns = [
  helper.accessor('id', {
    cell: cell => (
      <Link className='underline' href={`/datasources/${cell.getValue()}`}>{cell.getValue()}</Link>
    ),
  }),
  helper.accessor('name', {}),
  helper.accessor('description', {}),
  helper.accessor('build_kg_index', {}),
  helper.accessor('user_id', {}),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('updated_at', { cell: datetime }),
] as ColumnDef<Datasource>[];

export default function ChatEnginesPage () {
  return (
    <>
      <AdminPageHeading title="Datasources" />
      <DataTableRemote
        before={(
          <DataTableHeading>
            <Link className={buttonVariants({ className: 'gap-2' })} href={`/datasources/create/file`}>
              <PlusIcon className="size-4" />
              <span>
                Create
              </span>
            </Link>
          </DataTableHeading>
        )}
        columns={columns}
        apiKey="api.datasources.list"
        api={listDataSources}
        idColumn="id"
      />
    </>
  );
}
