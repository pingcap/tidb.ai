import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useFormContext } from 'react-hook-form';

export function FormRootError ({ title = 'Operation failed' }: { title?: string }) {
  const { formState } = useFormContext();
  const error = formState.errors.root;

  return error ? <Alert variant="destructive">
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{error.message}</AlertDescription>
  </Alert> : null;
}
