'use client';

import { listRerankers, type Reranker } from '@/api/rerankers';
import { DataTableRemote } from '@/components/data-table-remote';
import { Badge } from '@/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import Link from 'next/link';

export default function RerankerModelsTable () {
  return (
    <DataTableRemote
      columns={columns}
      apiKey="api.rerankers.list"
      api={listRerankers}
      idColumn="id"
    />
  );
}
const helper = createColumnHelper<Reranker>();
const columns: ColumnDef<Reranker, any>[] = [
  helper.accessor('name', {
    header: 'Name',
    cell: ({ row }) => {
      const { id, name, is_default } = row.original;
      return (
        <Link className="flex gap-1 items-center underline" href={`/reranker-models/${id}`}>
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
  helper.accessor('top_n', {
    header: 'Top N',
  }),
];
