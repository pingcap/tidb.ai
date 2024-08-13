'use client';

import { type Document, listDocuments } from '@/api/documents';
import { datetime } from '@/components/cells/datetime';
import { mono } from '@/components/cells/mono';
import { DatasourceCell } from '@/components/cells/reference';
import { DataTableRemote } from '@/components/data-table-remote';
import { DocumentPreviewDialog } from '@/components/document-viewer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import isHotkey from 'is-hotkey';
import { useRef } from 'react';

const helper = createColumnHelper<Document>();

const href = (cell: CellContext<any, string>) => <a className="underline" href={cell.getValue()} target="_blank">{cell.getValue()}</a>;

const columns = [
  helper.accessor('id', { cell: mono }),
  helper.accessor('data_source_id', { cell: ctx => <DatasourceCell id={ctx.getValue()} /> }),
  helper.accessor('name', { cell: mono }),
  helper.accessor('source_uri', { cell: href }),
  helper.accessor('mime_type', { cell: mono }),
  helper.display({ id: 'content', cell: ({ row }) => <DocumentPreviewDialog title={row.original.source_uri} mime={row.original.mime_type} content={row.original.content} /> }),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('updated_at', { cell: datetime }),
  helper.accessor('last_modified_at', { cell: datetime }),
] as ColumnDef<Document>[];

const columnsWithoutDatasource = [...columns];
columnsWithoutDatasource.splice(1, 1);

export function DocumentsTable ({ datasourceId }: { datasourceId?: number }) {
  const searchRef = useRef<HTMLInputElement>(null);
  return (
    <DataTableRemote
      toolbar={(({ setGlobalFilter }) => (
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search URL..."
            ref={searchRef}
            onKeyDown={event => {
              if (isHotkey('Enter', event)) {
                setGlobalFilter(searchRef.current?.value ?? '');
              }
            }}
          />
          <Button onClick={() => {
            setGlobalFilter(searchRef.current?.value ?? '');
          }}>
            Search
          </Button>
        </div>
      ))}
      columns={datasourceId != null ? columnsWithoutDatasource : columns}
      apiKey={datasourceId != null ? `api.datasource.${datasourceId}.documents` : 'api.documents.list'}
      api={(params, { globalFilter }) => listDocuments({ ...params, data_source_id: datasourceId, query: globalFilter })}
      idColumn="id"
    />
  );
}

