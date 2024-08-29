'use client';

import { ModelComponentInfo } from '@/components/model-component-info';
import { useReranker } from '@/components/reranker/hooks';

export function RerankerInfo ({ className, reverse = false, detailed = false, id }: { className?: string, reverse?: boolean, detailed?: boolean, id: number | undefined | null }) {
  const { reranker, isLoading } = useReranker(id);

  return <ModelComponentInfo
    className={className}
    model={reranker}
    url={reranker => `/reranker-models/${reranker.id}`}
    isLoading={isLoading}
    reverse={reverse}
    detailed={detailed}
    defaultName="Default Reranker Model"
  />;
}
