import { AdminPageHeading } from '@/components/admin-page-heading';
import { EvaluationTasksTable } from '@/components/evaluations/evaluation-tasks-table';

export default function EvaluationTasksPage () {
  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Evaluation' },
          { title: 'Tasks' },
        ]}
      />
      <EvaluationTasksTable />;
    </>
  );
}
