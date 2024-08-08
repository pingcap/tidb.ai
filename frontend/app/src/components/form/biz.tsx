import { listLlms, type LLM } from '@/api/llms';
import { listRerankers, type Reranker } from '@/api/rerankers';
import { FormSelect, type FormSelectConfig, type FormSelectProps } from '@/components/form/control-widget';
import { LlmInfo } from '@/components/llm/LlmInfo';
import { RerankerInfo } from '@/components/reranker/RerankerInfo';
import { forwardRef } from 'react';
import useSWR from 'swr';

export const LLMSelect = forwardRef<any, Omit<FormSelectProps, 'config'>>((props, ref) => {
  const { data: llms, isLoading, error } = useSWR('api.llms.list-all', () => listLlms({ size: 100 }));

  return (
    <FormSelect
      {...props}
      config={{
        options: llms?.items ?? [],
        loading: isLoading,
        error,
        renderOption: option => (<span><LlmInfo reverse id={option.id} /></span>),
        key: 'id',
      } satisfies FormSelectConfig<LLM>}
    />
  );
});

LLMSelect.displayName = 'LLMSelect';

export const RerankerSelect = forwardRef<any, Omit<FormSelectProps, 'config'>>((props, ref) => {
  const { data: rerankers, isLoading, error } = useSWR('api.rerankers.list-all', () => listRerankers({ size: 100 }));

  return (
    <FormSelect
      {...props}
      config={{
        options: rerankers?.items ?? [],
        loading: isLoading,
        error,
        renderOption: option => (<span><RerankerInfo reverse id={option.id} /></span>),
        key: 'id',
      } satisfies FormSelectConfig<Reranker>}
    />
  );
});

RerankerSelect.displayName = 'RerankerSelect';
