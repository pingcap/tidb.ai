import type { KnowledgeGraphDocumentChunk } from '@/api/knowledge-base';
import { DataTable } from '@/components/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';

export function DocumentChunksTable ({ data }: { data: KnowledgeGraphDocumentChunk[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
}

const columnsHelper = createColumnHelper<KnowledgeGraphDocumentChunk>();

const columns: ColumnDef<KnowledgeGraphDocumentChunk, any>[] = [
  columnsHelper.accessor('id', {}),
  columnsHelper.accessor('hash', {}),
  columnsHelper.accessor('text', {}),
];
