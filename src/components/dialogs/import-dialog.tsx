import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { getErrorMessage } from '@/lib/errors';
import { AlertTriangleIcon } from 'lucide-react';
import { type ReactElement, type ReactNode, useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';

export function ImportDialog<T extends FieldValues> ({ title, description, onSubmit, trigger, children }: { title: ReactNode, onSubmit: (value: T) => Promise<void>, description?: ReactNode, trigger: ReactElement, children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const form = useForm<T>();
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
      <DialogContent>
        <DialogHeader>
          {title}
        </DialogHeader>
        {!!error && (<Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>
            Failed to submit
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
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
