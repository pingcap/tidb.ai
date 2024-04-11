'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { metadataCell } from '@/components/cells/metadata';
import { DataTableRemote } from '@/components/data-table-remote';
import type { Index } from '@/core/v1/index_';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';

export default function PageClient () {
  return (
    <>
      <AdminPageHeading title="Explore all indexes" />
      <DataTableRemote
        columns={columns}
        api="/api/v2/indexes"
        idColumn="id"
      />
    </>
  );
}

const helper = createColumnHelper<Index>();

const columns: ColumnDef<Index, any>[] = [
  helper.accessor('id', {}),
  helper.accessor('name', {}),
  helper.display({ cell: ctx => ctx.row.original.config.provider, header: 'type' }),
  helper.accessor('config', { cell: metadataCell }),
];

