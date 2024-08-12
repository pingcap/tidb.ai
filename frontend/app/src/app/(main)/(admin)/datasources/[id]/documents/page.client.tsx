'use client';

import type { Datasource } from '@/api/datasources';
import { type Document, listDocuments } from '@/api/documents';
import { datetime } from '@/components/cells/datetime';
import { DataTableRemote } from '@/components/data-table-remote';
import { DocumentPreviewDialog } from '@/components/document-viewer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import isHotkey from 'is-hotkey';
import { useRef } from 'react';

const helper = createColumnHelper<Document>();

const mono = (cell: CellContext<any, any>) => <span className="font-mono">{cell.getValue()}</span>;
const href = (cell: CellContext<any, string>) => <a className="underline" href={cell.getValue()} target="_blank">{cell.getValue()}</a>;

const columns = [
  helper.accessor('id', { cell: mono }),
  helper.accessor('name', { cell: mono }),
  helper.accessor('source_uri', { cell: href }),
  helper.accessor('mime_type', { cell: mono }),
  helper.display({ id: 'content', cell: ({ row }) => <DocumentPreviewDialog title={row.original.source_uri} mime={row.original.mime_type} content={row.original.content} /> }),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('updated_at', { cell: datetime }),
  helper.accessor('last_modified_at', { cell: datetime }),
] as ColumnDef<Document>[];

export default function DatasourceDocumentsDocumentsPage ({ datasource }: { datasource: Datasource }) {
  const searchRef = useRef<HTMLInputElement>(null);
  return (
    <>
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
        columns={columns}
        apiKey={`api.datasource.${datasource.id}.documents`}
        api={(params, { globalFilter }) => listDocuments({ ...params, data_source_id: datasource.id, query: globalFilter })}
        idColumn="id"
      />
    </>
  );
}

