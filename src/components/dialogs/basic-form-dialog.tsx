import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog';
import {Form} from '@/components/ui/form';
import {getErrorMessage} from '@/lib/errors';
import {zodResolver} from '@hookform/resolvers/zod';
import {AlertTriangleIcon} from 'lucide-react';
import {type ReactElement, type ReactNode, useState} from 'react';
import {type FieldValues, useForm} from 'react-hook-form';
import {ZodType} from 'zod';

export interface BasicFormDialogProps<T extends FieldValues> {
  title: ReactNode;
  description?: ReactNode;
  schema?: ZodType<T>;
  defaultValues?: T;
  fromId?: string;
  submitButtonTitle?: string;
  onSubmit: (value: T) => Promise<void>;
  trigger: ReactElement;
  children: ReactNode;
}

export function BasicFormDialog<T extends FieldValues>(props: BasicFormDialogProps<any>) {
  const {
    title,
    description,
    defaultValues,
    schema,
    fromId = "basic-form",
    onSubmit,
    submitButtonTitle = 'Submit',
    trigger,
    children
  } = props;
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

        {description && <DialogDescription>{description}</DialogDescription>}

        {!!error && (<Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4"/>
          <AlertTitle>
            Failed to operate
          </AlertTitle>
          <AlertDescription>
            {getErrorMessage(error)}
          </AlertDescription>
        </Alert>)}

        <Form {...form}>
          <form id={fromId} className="space-y-4" onSubmit={handleSubmit}>
            {children}
          </form>
        </Form>
        <DialogFooter>
          <Button form={fromId} type="submit" disabled={loading}>
            {submitButtonTitle}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
