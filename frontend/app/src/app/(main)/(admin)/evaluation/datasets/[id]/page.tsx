'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { EvaluationDatasetInfo } from '@/components/evaluations/evaluation-dataset-info';
import { EvaluationDatasetItemsTable } from '@/components/evaluations/evaluation-dataset-items-table';
import { useEvaluationDataset } from '@/components/evaluations/hooks';
import { isServerError } from '@/lib/request';
import { Loader2Icon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { use } from 'react';

export default function EvaluationDatasetPage (props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const evaluationDatasetId = parseInt(decodeURIComponent(params.id));

  const { evaluationDataset, isLoading, isValidating, error } = useEvaluationDataset(evaluationDatasetId);

  if (isServerError(error, 404)) {
    notFound();
  }

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Evaluation', docsUrl: '/docs/evaluation' },
          { title: 'Datasets', url: '/evaluation/datasets' },
          { title: evaluationDataset?.name ?? <Loader2Icon className="size-4 animate-spin repeat-infinite" /> },
        ]}
      />
      <EvaluationDatasetInfo evaluationDatasetId={evaluationDatasetId} />
      <EvaluationDatasetItemsTable evaluationDatasetId={evaluationDatasetId} />
    </>
  );
}
