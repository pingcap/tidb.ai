'use client';

import { type EvaluationTaskItem, listEvaluationTaskItems } from '@/api/evaluations';
import { datetime } from '@/components/cells/datetime';
import { mono } from '@/components/cells/mono';
import { DataTableRemote } from '@/components/data-table-remote';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { CircleCheckIcon, CircleDashedIcon, CircleXIcon, Loader2Icon } from 'lucide-react';

const helper = createColumnHelper<EvaluationTaskItem>();

const columns = [
  helper.accessor('id', { header: 'ID', cell: mono }),
  helper.accessor('chat_engine', { header: 'ChatEngine' }),
  helper.accessor('status', { header: 'Status', cell: ctx => <StatusCell row={ctx.row.original} /> }),
  helper.accessor('query', { header: 'Query' }),
  helper.accessor('factual_correctness', { header: 'factual_correctness' }),
  helper.accessor('semantic_similarity', { header: 'semantic_similarity' }),
  helper.accessor('reference', { header: 'Reference' }),
  helper.accessor('response', { header: 'Response' }),
  helper.accessor('retrieved_contexts', { header: 'Retrieved Contexts' }),
  helper.accessor('extra', { header: 'Extra' }),
  helper.accessor('created_at', { header: 'Created At', cell: datetime }),
  helper.accessor('updated_at', { header: 'Updated At', cell: datetime }),
] as ColumnDef<EvaluationTaskItem>[];

export function EvaluationTaskItemsTable ({ evaluationTaskId }: { evaluationTaskId: number }) {
  return (
    <DataTableRemote
      columns={columns}
      apiKey={`api.evaluation.tasks.${evaluationTaskId}.items.list`}
      api={(page) => listEvaluationTaskItems(evaluationTaskId, page)}
      idColumn="id"
    />
  );
}

function StatusCell ({ row }: { row: EvaluationTaskItem }) {
  const { status, error_msg } = row;
  // TODO: popover error_msg
  return (
    <span className="inline-flex gap-1">
      {status === 'not_start' && <CircleDashedIcon className="text-muted flex-shrink-0 size-4" />}
      {status === 'evaluating' && <Loader2Icon className="text-info flex-shrink-0 size-4 animate-spin repeat-infinite" />}
      {status === 'done' && <CircleCheckIcon className="text-success flex-shrink-0 size-4" />}
      {status === 'error' && <CircleXIcon className="text-destructive flex-shrink-0 size-4" />}
      <span className="text-accent">
        {status === 'not_start' ? 'not start' : status === 'evaluating' ? 'evaluating' : status === 'done' ? 'done' : 'error'}
      </span>
    </span>
  );
}
