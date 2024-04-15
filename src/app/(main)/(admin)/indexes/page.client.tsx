'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { metadataCell } from '@/components/cells/metadata';
import { DataTableRemote } from '@/components/data-table-remote';
import { CreateIndexDialog } from '@/components/dialogs/create-index-dialog';
import type { Index } from '@/core/repositories/index_';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function PageClient () {
  return (
    <>
      <AdminPageHeading title="Explore all indexes" />
      <DataTableRemote
        before={(
          <div className='flex items-center'>
            <span className='ml-auto'/>
            <CreateIndexDialog />
          </div>
        )}
        columns={columns}
        api="/api/v1/indexes"
        idColumn="id"
      />
    </>
  );
}

const helper = createColumnHelper<Index>();

const columns: ColumnDef<Index, any>[] = [
  helper.accessor('id', {}),
  helper.accessor('name', {
    cell: (ctx) => (
      <Link className="flex gap-2 items-center underline" href={`/indexes/${ctx.row.original.id}`}>
        {ctx.getValue()}
        <LinkIcon className="w-3 h-3" />
      </Link>
    ),
  }),
  helper.display({ cell: ctx => ctx.row.original.config.provider, header: 'type' }),
  helper.accessor('config', { cell: metadataCell }),
];

