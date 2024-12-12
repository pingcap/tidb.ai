import { AdminPageHeading } from '@/components/admin-page-heading';
import { EvaluationDatasetsTable } from '@/components/evaluations/evaluation-datasets-table';

export default function EvaluationDatasetsPage () {
  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Evaluation' },
          { title: 'Datasets' },
        ]}
      />
      <EvaluationDatasetsTable />
    </>
  );
}
