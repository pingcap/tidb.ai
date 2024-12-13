import { listEvaluationDatasets, listEvaluationTasks } from '@/api/evaluations';
import { listAllHelper } from '@/lib/request';
import useSWR, { mutate } from 'swr';

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

export function mutateEvaluationDatasets () {
  return mutate(key => {
    if (typeof key === 'string') {
      return key.startsWith(`api.evaluation.datasets.`);
    }
    return false;
  });
}

export function useAllEvaluationTasks (flag = true) {
  return useSWR(flag && 'api.evaluation.tasks.list-all', () => listAllHelper(listEvaluationTasks, 'id'));
}

export function useEvaluationTask (id: number | null | undefined) {
  const { data, mutate, ...rest } = useAllEvaluationTasks(id != null);

  return {
    evaluationTask: data?.find(evaluationTask => evaluationTask.id === id),
    ...rest,
  };
}

export function mutateEvaluationTasks () {
  return mutate(key => {
    if (typeof key === 'string') {
      return key.startsWith(`api.evaluation.tasks.`);
    }
    return false;
  });
}
