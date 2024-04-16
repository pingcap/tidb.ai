'use client';

import { useIndex } from '@/app/(main)/(admin)/indexes/[id]/context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { LayoutProps } from '@/lib/next/types';

export default function Layout ({ children }: LayoutProps) {
  const index = useIndex();

  return (
    <>
      {!!index.configured && <Alert className='mb-4'>
        <AlertTitle>
          Index configuration is readonly
        </AlertTitle>
        <AlertDescription>
          Index configuration is not modifiable after marked `configured`.
          If you want to customize index configuration, create new one.
        </AlertDescription>
      </Alert>}
      {children}
    </>
  );
}
