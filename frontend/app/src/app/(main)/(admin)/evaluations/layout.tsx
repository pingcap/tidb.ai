import { EvaluationsTabs } from '@/app/(main)/(admin)/evaluations/tabs';
import { SecondaryNavigatorLayout, SecondaryNavigatorList, SecondaryNavigatorMain } from '@/components/secondary-navigator-list';
import { ReactNode } from 'react';

export default function EvaluationsLayout ({ heading, children }: { heading: ReactNode, children: ReactNode }) {
  return (
    <>
      {heading}
      <SecondaryNavigatorLayout>
        <SecondaryNavigatorList>
          <EvaluationsTabs />
        </SecondaryNavigatorList>
        <SecondaryNavigatorMain className="space-y-4 px-2">
          {children}
        </SecondaryNavigatorMain>
      </SecondaryNavigatorLayout>
    </>
  );
}