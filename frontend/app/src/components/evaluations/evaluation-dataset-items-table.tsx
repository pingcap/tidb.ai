'use client';

import { type EvaluationDatasetItem, listEvaluationDatasetItems } from '@/api/evaluations';
import { datetime } from '@/components/cells/datetime';
import { mono } from '@/components/cells/mono';
import { DataTableRemote } from '@/components/data-table-remote';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';

const helper = createColumnHelper<EvaluationDatasetItem>();

const columns = [
  helper.accessor('id', { header: 'ID', cell: mono }),
  helper.accessor('query', { header: 'Query' }),
  helper.accessor('reference', { header: 'Reference' }),
  helper.accessor('retrieved_contexts', { header: 'retrieved_contexts' }),
  helper.accessor('extra', { header: 'extra' }),
  helper.accessor('created_at', { header: 'Created At', cell: datetime }),
  helper.accessor('updated_at', { header: 'Updated At', cell: datetime }),
] as ColumnDef<EvaluationDatasetItem>[];

export function EvaluationDatasetItemsTable ({ evaluationDatasetId }: { evaluationDatasetId: number }) {
  return (
    <DataTableRemote
      columns={columns}
      apiKey="api.evaluation.datasets.list"
      api={(page) => listEvaluationDatasetItems(evaluationDatasetId, page)}
      idColumn="id"
    />
  );
}
