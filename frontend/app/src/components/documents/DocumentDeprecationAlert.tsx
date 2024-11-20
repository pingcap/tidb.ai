import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

export function DocumentDeprecationAlert () {
  return (
    <Alert variant="warning">
      <AlertCircleIcon />
      <AlertTitle>
        Bare Documents management was deprecated.
      </AlertTitle>
      <AlertDescription>
        TiDB.ai now uses Knowledge Base to manage documents. This page will be removed soon.
      </AlertDescription>
    </Alert>
  );
}