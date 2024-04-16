import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { getErrorMessage } from '@/lib/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangleIcon } from 'lucide-react';
import { type ReactElement, type ReactNode, useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { ZodType } from 'zod';

export function ImportDialog<T extends FieldValues> ({ title, description, onSubmit, trigger, submitTitle = 'Import', defaultValues, schema, children }: { title: ReactNode, onSubmit: (value: T) => Promise<void>, description?: ReactNode, trigger: ReactElement, children: ReactNode, submitTitle?: string, defaultValues?: T, schema?: ZodType<T> }) {
  const [open, setOpen] = useState(false);
  const form = useForm<T>({
    values: defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const handleSubmit = form.handleSubmit(async (value) => {
    try {
      setLoading(true);
      await onSubmit(value);
      setOpen(false);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-x-hidden overflow-y-auto">
        <DialogHeader>
          {title}
        </DialogHeader>
        {!!error && (<Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>
            Failed to operate
          </AlertTitle>
          <AlertDescription>
            {getErrorMessage(error)}
          </AlertDescription>
        </Alert>)}
        <Form {...form}>
          <form id="import-uri-list" className="space-y-4" onSubmit={handleSubmit}>
            {children}
          </form>
        </Form>
        {description && <DialogDescription>{description}</DialogDescription>}
        <DialogFooter>
          <Button form="import-uri-list" type="submit" disabled={loading}>
            {submitTitle}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
