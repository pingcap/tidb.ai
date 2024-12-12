import { AdminPageHeading } from '@/components/admin-page-heading';
import { EvaluationTaskItemsTable } from '@/components/evaluations/evaluation-task-items-table';
import { EvaluationTaskSummary } from '@/components/evaluations/evaluation-task-summary';

export default async function EvaluationTaskPage (props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const evaluationTaskId = parseInt(decodeURIComponent(params.id));

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Evaluation' },
          { title: 'Tasks', url: '/evaluation/tasks' },
          { title: String(evaluationTaskId) },
        ]}
      />
      <EvaluationTaskSummary evaluationTaskId={evaluationTaskId} />
      <EvaluationTaskItemsTable evaluationTaskId={evaluationTaskId} />
    </>
  );
}
