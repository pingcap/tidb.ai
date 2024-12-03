'use client';

import { type EmbeddingModel, listEmbeddingModels } from '@/api/embedding-models';
import { mono } from '@/components/cells/mono';
import { DataTableRemote } from '@/components/data-table-remote';
import { Badge } from '@/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import Link from 'next/link';

export function EmbeddingModelsTable () {
  return (
    <DataTableRemote
      columns={columns}
      apiKey="api.embedding-models.list"
      api={listEmbeddingModels}
      idColumn="id"
    />
  );
}

const helper = createColumnHelper<EmbeddingModel>();
const columns: ColumnDef<EmbeddingModel, any>[] = [
  helper.accessor('name', {
    header: 'Name',
    cell: ({ row }) => {
      const { id, name, is_default } = row.original;
      return (
        <Link className="flex gap-1 items-center underline" href={`/embedding-models/${id}`}>
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
  helper.accessor('vector_dimension', { cell: mono }),
];
