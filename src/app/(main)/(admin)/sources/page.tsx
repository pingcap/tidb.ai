'use client';

import { DataTable } from '@/components/data-table';
import { ImportSiteDialog } from '@/components/dialogs/import-site-dialog';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { AdminPageLayout } from '@/components/admin-page-layout';
import type { DB } from '@/core/db/schema';
import type { CellContext } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import type { Selectable } from 'kysely';
import useSWR from 'swr';

export default function Page () {
  const { data = [] } = useSWR<Selectable<DB['import_source']>[]>(['/api/v1/sources'], { fetcher });

  const columns = [
    helper.accessor('id', {}),
    helper.accessor('url', {}),
    helper.accessor('type', {}),
    helper.accessor('created_at', { cell: datetime }),
  ];

  return (
    <>
      <AdminPageHeading title="Sources" actions={<ImportSiteDialog />} />
      <DataTable columns={columns} data={data} />
    </>
  );
}

const datetime = (cell: CellContext<any, any>) => <time>{format(cell.getValue(), 'yyyy-MM-dd HH:mm')}</time>;

const helper = createColumnHelper<Selectable<DB['import_source']>>();

const fetcher = async ([url]: [string]) => {
  const res = await fetch(url);
  if (!res.ok || res.redirected) {
    const error = new Error(`${res.status} ${res.statusText}`);
    throw error;
  }

  return res.json();
};
