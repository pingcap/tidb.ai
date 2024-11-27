'use client';

import { listLlms, type LLM } from '@/api/llms';
import { DataTableRemote } from '@/components/data-table-remote';
import { Badge } from '@/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import Link from 'next/link';

export function LLMsTable () {
  return (
    <DataTableRemote
      columns={columns}
      apiKey="api.llms.list"
      api={listLlms}
      idColumn="id"
    />
  );
}

const helper = createColumnHelper<LLM>();
const columns: ColumnDef<LLM, any>[] = [
  helper.accessor('name', {
    header: 'Name',
    cell: ({ row }) => {
      const { id, name, is_default } = row.original;
      return (
        <Link className="flex gap-1 items-center underline" href={`/llms/${id}`}>
          {is_default && <Badge>default</Badge>}
          {name}
        </Link>
      );
    },
  }),
  helper.display({
    header: 'Provider / Model',
    cell: ({ row }) => {
      const { model, provider } = row.original;
      return (
        <>
          <strong>{provider}</strong>:<span>{model}</span>
        </>
      );
    },
  }),
];
