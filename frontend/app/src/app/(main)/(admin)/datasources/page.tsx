'use client';

import { type Datasource, deleteDatasource, listDataSources } from '@/api/datasources';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { DangerousActionButton } from '@/components/dangerous-action-button';
import { DataTableHeading } from '@/components/data-table-heading';
import { DataTableRemote } from '@/components/data-table-remote';
import { LlmInfo } from '@/components/llm/LlmInfo';
import { buttonVariants } from '@/components/ui/button';
import { useDataTable } from '@/components/use-data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { PlusIcon, TrashIcon } from 'lucide-react';
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
  helper.accessor('llm_id', { cell: (ctx) => <LlmInfo className="justify-end" reverse id={ctx.getValue()} /> }),
  helper.accessor('build_kg_index', {}),
  helper.accessor('user_id', {}),
  helper.display({
    header: 'Actions',
    cell: ({ row }) => (
      <span className="flex gap-2 items-center">
        <DeleteButton datasource={row.original} />
      </span>
    ),
  }),
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

function DeleteButton ({ datasource }: { datasource: Datasource }) {
  const { reload } = useDataTable();

  return (
    <DangerousActionButton
      action={async () => {
        await deleteDatasource(datasource.id);
        reload?.();
      }}
      variant="ghost"
      className="text-xs text-destructive hover:text-destructive hover:bg-destructive/20"
    >
      <TrashIcon className="w-3 mr-1" />
      Delete
    </DangerousActionButton>
  );
}
