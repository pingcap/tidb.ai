'use client';

import { type EvaluationTaskItem, listEvaluationTaskItems } from '@/api/evaluations';
import { datetime } from '@/components/cells/datetime';
import { metadataCell } from '@/components/cells/metadata';
import { mono } from '@/components/cells/mono';
import { percent } from '@/components/cells/percent';
import { DataTableRemote } from '@/components/data-table-remote';
import { documentCell, evaluationTaskStatusCell, textChunksArrayCell } from '@/components/evaluations/cells';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { noPage } from '@/lib/zod';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';

const helper = createColumnHelper<EvaluationTaskItem>();

const columns = [
  helper.accessor('id', { header: 'ID', cell: mono }),
  helper.accessor('chat_engine', { header: 'ChatEngine' }),
  helper.accessor('status', { header: 'Status', cell: evaluationTaskStatusCell }),
  helper.accessor('query', { header: 'Query', cell: documentCell('Query') }),
  helper.accessor('factual_correctness', { header: 'factual_correctness', cell: context => percent(context) }),
  helper.accessor('semantic_similarity', { header: 'semantic_similarity', cell: context => percent(context) }),
  helper.accessor('reference', { header: 'Reference', cell: documentCell('Reference') }),
  helper.accessor('response', { header: 'Response', cell: documentCell('Response') }),
  helper.accessor('retrieved_contexts', { header: 'Retrieved Contexts', cell: textChunksArrayCell }),
  helper.accessor('extra', { header: 'Extra', cell: metadataCell }),
  helper.accessor('created_at', { header: 'Created At', cell: datetime }),
  helper.accessor('updated_at', { header: 'Updated At', cell: datetime }),
] as ColumnDef<EvaluationTaskItem>[];

export function EvaluationTaskItemsTable ({ evaluationTaskId }: { evaluationTaskId: number }) {
  return (
    <DataTableRemote
      columns={columns}
      apiKey={`api.evaluation.tasks.${evaluationTaskId}.items.list`}
      api={() => listEvaluationTaskItems(evaluationTaskId).then(res => noPage(res))}
      idColumn="id"
    />
  );
}
