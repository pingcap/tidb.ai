import { FormFieldInlineLayout } from '@/components/form/field-layout';
import { useManagedDialog } from '@/components/managed-dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ReactElement, useMemo } from 'react';
import { type DefaultValues, useForm } from 'react-hook-form';
import { z, type ZodType } from 'zod';

export interface EditPropertyFormProps<T, P extends keyof T & string> {
  className?: string;
  object: T;
  property: P;
  schema: ZodType<T[P], any, any>;
  description?: string;
  disabled?: boolean;
  children: ReactElement;
  inline?: boolean;

  onSubmit (value: Record<P, T[P]>): void;
}

export function EditPropertyForm<T, P extends keyof T & string> ({ className, object, property, schema, onSubmit, inline, disabled, description, children }: EditPropertyFormProps<T, P>) {
  const { setOpen } = useManagedDialog();

  const resolver = useMemo(() => {
    return zodResolver(z.object({
      [property]: schema,
    }));
  }, [schema, property]);

  const form = useForm<Record<P, T[P]>>({
    resolver,
    disabled,
    defaultValues: {
      [property]: object[property] ?? '',
    } as DefaultValues<Record<P, T[P]>>,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit(data);
    setOpen(false);
  });

  return (
    <Form {...form}>
      <form id="update-form" className={cn(inline ? 'flex gap-2 items-center w-max ml-auto' : 'space-y-4', className)} onSubmit={handleSubmit}>
        <FormFieldInlineLayout name={property} description={description}>
          {children}
        </FormFieldInlineLayout>
        <div className="flex justify-end">
          <Button type="submit" variant="secondary" disabled={form.formState.disabled || form.formState.isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}