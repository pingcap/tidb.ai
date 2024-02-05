'use client';

import { useActionResult } from '@/components/action-provider';
import { Alert, AlertTitle } from '@/components/ui/alert';

export function ActionError ({ className }: { className?: string}) {
  const result = useActionResult();
  if (result && 'error' in result) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertTitle>{result.error}</AlertTitle>
      </Alert>
    );
  }

  return null;
}