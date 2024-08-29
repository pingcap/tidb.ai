'use client';

import { useLlm } from '@/components/llm/hooks';
import { ModelComponentInfo } from '@/components/model-component-info';

export function LlmInfo ({ className, reverse = false, detailed = false, id }: { className?: string, reverse?: boolean, detailed?: boolean, id: number | undefined | null }) {
  const { llm, isLoading } = useLlm(id);

  return <ModelComponentInfo
    className={className}
    model={llm}
    url={llm => `/llms/${llm.id}`}
    isLoading={isLoading}
    reverse={reverse}
    detailed={detailed}
    defaultName="Default LLM"
  />;
}
