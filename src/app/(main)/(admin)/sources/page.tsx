'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { DataTableRemote } from '@/components/data-table-remote';
import { ImportSiteDialog } from '@/components/dialogs/import-site-dialog';
import { Separator } from '@/components/ui/separator';
import {DBv1} from "@/core/v1/db";
import type { CellContext } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import {Selectable} from "kysely";
import useSWR from 'swr';

interface ColumnDef extends Selectable<DBv1['source']> {
  summary: Record<string, string>;
}

const helper = createColumnHelper<ColumnDef>();

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
        if (!summary) {
          return <span>No state</span>
        }
        return (
          <div className="flex h-5 items-center space-x-4">
            <div>Created: {summary.CREATED || 0}</div>
            <Separator orientation="vertical" />
            <div>Pending: {summary.PENDING || 0}</div>
            <Separator orientation="vertical" />
            <div>Importing: {summary.IMPORTING || 0}</div>
            <Separator orientation="vertical" />
            <div>Succeed: {summary.SUCCEED || 0}</div>
            <Separator orientation="vertical" />
            <div>Failed: {summary.FAILED || 0}</div>
          </div>
        );
      },
    }),
    helper.accessor('created_at', { cell: datetime }),
  ];

  // FIXME: make it work
  return (
    <>
      <AdminPageHeading title="Sources" />
      <div className="flex justify-end">
        <ImportSiteDialog />
      </div>
      <DataTableRemote
        columns={[]}
        api="/api/v1/sources"
        idColumn="id"
      />
    </>
  );
}

const datetime = (cell: CellContext<any, any>) => <time>{format(cell.getValue(), 'yyyy-MM-dd HH:mm')}</time>;

const fetcher = async ([url]: [string]) => {
  const res = await fetch(url);
  if (!res.ok || res.redirected) {
    const error = new Error(`${res.status} ${res.statusText}`);
    throw error;
  }

  return res.json();
};
