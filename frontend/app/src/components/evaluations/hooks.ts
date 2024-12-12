import { listEvaluationDatasets } from '@/api/evaluations';
import { listAllHelper } from '@/lib/request';
import useSWR from 'swr';

export function useAllEvaluationDatasets (flag = true) {
  return useSWR(flag && 'api.evaluation.datasets.list-all', () => listAllHelper(listEvaluationDatasets, 'id'));
}

export function useEvaluationDataset (id: number | null | undefined) {
  const { data, mutate, ...rest } = useAllEvaluationDatasets(id != null);

  return {
    evaluationDataset: data?.find(evaluationDataset => evaluationDataset.id === id),
    ...rest,
  };
}
