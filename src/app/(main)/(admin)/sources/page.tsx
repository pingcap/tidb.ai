'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { DataTable } from '@/components/data-table';
import { ImportSiteDialog } from '@/components/dialogs/import-site-dialog';
import { Separator } from '@/components/ui/separator';
import type { CellContext } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import useSWR from 'swr';

export default function Page () {
  const { data = [] } = useSWR<ColumnDef[]>(['/api/v1/sources'], { fetcher });
  const columns = [
    helper.accessor('id', {}),
    helper.accessor('url', {}),
    helper.accessor('type', {}),
    helper.accessor('summary', {
      header: 'Process',
      cell: (cell: CellContext<ColumnDef, any>) => {
        const summary = cell.row.original.summary;
        return (
          <div className="flex h-5 items-center space-x-4">
            <div>Pending: {summary.pending || 0}</div>
            <Separator orientation="vertical" />
            <div>Processing: {summary.processing || 0}</div>
            <Separator orientation="vertical" />
            <div>Succeed: {summary.succeed || 0}</div>
            <Separator orientation="vertical" />
            <div>Failed: {summary.failed || 0}</div>
          </div>
        );
      },
    }),
    helper.accessor('created_at', { cell: datetime }),
  ];

  return (
    <>
      <AdminPageHeading title="Sources" />
      <div className="flex justify-end">
        <ImportSiteDialog />
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}

const datetime = (cell: CellContext<any, any>) => <time>{format(cell.getValue(), 'yyyy-MM-dd HH:mm')}</time>;

interface ColumnDef extends Selectable<DB['import_source']> {
  summary: Record<string, string>;
}

const helper = createColumnHelper<ColumnDef>();

const fetcher = async ([url]: [string]) => {
  const res = await fetch(url);
  if (!res.ok || res.redirected) {
    const error = new Error(`${res.status} ${res.statusText}`);
    throw error;
  }

  return res.json();
};
