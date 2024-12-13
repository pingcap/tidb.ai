'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { EvaluationTaskItemsTable } from '@/components/evaluations/evaluation-task-items-table';
import { EvaluationTaskSummary } from '@/components/evaluations/evaluation-task-summary';
import { useEvaluationTask } from '@/components/evaluations/hooks';
import { isServerError } from '@/lib/request';
import { Loader2Icon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { use } from 'react';

export default function EvaluationTaskPage (props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const evaluationTaskId = parseInt(decodeURIComponent(params.id));

  const { evaluationTask, isValidating, isLoading, error } = useEvaluationTask(evaluationTaskId);

  if (isServerError(error, 404) || (!isLoading && !isValidating && !evaluationTask)) {
    notFound();
  }

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Evaluation', docsUrl: '/docs/evaluation' },
          { title: 'Tasks', url: '/evaluation/tasks' },
          { title: evaluationTask?.name ?? <Loader2Icon className="size-4 animate-spin repeat-infinite" /> },
        ]}
      />
      <EvaluationTaskSummary evaluationTaskId={evaluationTaskId} />
      <EvaluationTaskItemsTable evaluationTaskId={evaluationTaskId} />
    </>
  );
}
