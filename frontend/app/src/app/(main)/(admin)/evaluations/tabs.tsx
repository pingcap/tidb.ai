'use client';

import { SecondaryNavigatorLink } from '@/components/secondary-navigator-list';

export function EvaluationsTabs ({}: {}) {
  return (
    <>
      <SecondaryNavigatorLink pathname={`/evaluations/datasets`}>
        Datasets
      </SecondaryNavigatorLink>
      <SecondaryNavigatorLink pathname={`/evaluations/tasks`}>
        Tasks
      </SecondaryNavigatorLink>
    </>
  );
}