'use client';

import { type Document, listDocuments, type ListDocumentsTableFilters } from '@/api/documents';
import { datetime } from '@/components/cells/datetime';
import { mono } from '@/components/cells/mono';
import { DatasourceCell, KnowledgeBaseCell } from '@/components/cells/reference';
import { DataTableRemote } from '@/components/data-table-remote';
import { DocumentPreviewDialog } from '@/components/document-viewer';
import { DocumentsTableFilters } from '@/components/documents/documents-table-filters';
import { NextLink } from '@/components/nextjs/NextLink';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { useMemo, useState } from 'react';

const helper = createColumnHelper<Document>();

const href = (cell: CellContext<any, string>) => <a className="underline" href={cell.getValue()} target="_blank">{cell.getValue()}</a>;

const getColumns = (kbId?: number) => [
  helper.accessor('id', { cell: mono }),
  helper.accessor('knowledge_base', { cell: ctx => <KnowledgeBaseCell {...ctx.getValue()} /> }),
  helper.accessor('data_source', { cell: ctx => <DatasourceCell {...ctx.getValue()} /> }),
  helper.accessor('name', { cell: mono }),
  helper.accessor('source_uri', { cell: href }),
  helper.accessor('mime_type', { cell: mono }),
  helper.display({ id: 'content', cell: ({ row }) => <DocumentPreviewDialog title={row.original.source_uri} mime={row.original.mime_type} content={row.original.content} /> }),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('updated_at', { cell: datetime }),
  helper.accessor('last_modified_at', { cell: datetime }),
  helper.display({
    id: 'op',
    cell: ({ row }) => (kbId ?? row.original.knowledge_base?.id) != null && <NextLink variant='ghost' size={'sm'} href={`/knowledge-bases/${kbId ?? row.original.knowledge_base?.id}/documents/${row.original.id}/chunks`}>Chunks</NextLink>,
  }),
] as ColumnDef<Document>[];

export function DocumentsTable ({ knowledgeBaseId }: { knowledgeBaseId?: number }) {
  const [filters, setFilters] = useState<ListDocumentsTableFilters>({});

  const columns = useMemo(() => {
    if (knowledgeBaseId != null) {
      const columns = [...getColumns(knowledgeBaseId)];
      columns.splice(1, 1);
      return columns;
    } else {
      return getColumns(knowledgeBaseId);
    }
  }, [knowledgeBaseId]);

  return (
    <DataTableRemote
      toolbar={((table) => (
        <DocumentsTableFilters table={table} onFilterChange={setFilters} />
      ))}
      columns={columns}
      apiKey={knowledgeBaseId != null ? `api.datasource.${knowledgeBaseId}.documents` : 'api.documents.list'}
      api={(params) => listDocuments({ ...params, ...filters, knowledge_base_id: knowledgeBaseId })}
      apiDeps={[filters]}
      idColumn="id"
    />
  );
}

