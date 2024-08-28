'use client';

import { type Datasource, deleteDatasource, listDataSources } from '@/api/datasources';
import { actions } from '@/components/cells/actions';
import { link } from '@/components/cells/link';
import { DataTableHeading } from '@/components/data-table-heading';
import { DataTableRemote } from '@/components/data-table-remote';
import { LlmInfo } from '@/components/llm/LlmInfo';
import { NextLink } from '@/components/nextjs/NextLink';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { PlusIcon, Trash2Icon } from 'lucide-react';

const helper = createColumnHelper<Datasource>();

const columns = [
  helper.accessor('name', { cell: link({ url: datasource => `/datasources/${datasource.id}` }) }),
  helper.accessor('data_source_type', {}),
  helper.accessor('llm_id', { cell: (ctx) => <LlmInfo className="justify-end" reverse id={ctx.getValue()} /> }),
  helper.accessor('build_kg_index', {}),
  helper.accessor('user_id', {}),
  helper.display({
    header: 'Actions',
    cell: actions(datasource => [
      {
        key: 'delete',
        title: 'Delete',
        icon: <Trash2Icon className="size-3" />,
        dangerous: {},
        action: async ({ table }) => {
          await deleteDatasource(datasource.id);
          table.reload?.();
        },
      },
    ]),
  }),
] as ColumnDef<Datasource>[];

export function DatasourceTable () {
  return (
    <DataTableRemote
      before={(
        <DataTableHeading>
          <NextLink className="gap-2" href={`/datasources/create/file`}>
            <PlusIcon className="size-4" />
            <span>
              Create
            </span>
          </NextLink>
        </DataTableHeading>
      )}
      columns={columns}
      apiKey="api.datasources.list"
      api={listDataSources}
      idColumn="id"
    />
  );
}
