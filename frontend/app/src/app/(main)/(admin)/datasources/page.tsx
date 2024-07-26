'use client';

import { type Datasource, listDataSources } from '@/api/datasources';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { DataTableHeading } from '@/components/data-table-heading';
import { DataTableRemote } from '@/components/data-table-remote';
import { buttonVariants } from '@/components/ui/button';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

const helper = createColumnHelper<Datasource>();

const columns = [
  helper.display({
    header: 'Name',
    cell: ({ row }) => (
      <Link className="underline" href={`/datasources/${row.original.id}`}>{row.original.name}</Link>
    ),
  }),
  helper.accessor('data_source_type', {}),
  helper.accessor('build_kg_index', {}),
  helper.accessor('user_id', {}),
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
