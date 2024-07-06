import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactNode } from 'react';
import type { DefaultValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z, type ZodType } from 'zod';

export interface ZodFormProps<Z extends ZodType> {
  className?: string;
  children: ReactNode;
  id?: string;
  schema: Z;
  onSubmit: (data: z.infer<Z>) => Promise<void>;
  values?: z.infer<Z>;
  defaultValues?: DefaultValues<z.infer<Z>>;
}

export function ZodForm<Z extends ZodType> ({ id, className, children, schema, values, defaultValues, onSubmit }: ZodFormProps<Z>) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    values,
  });

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <Form {...form}>
      <form id={id} className={className} onSubmit={handleSubmit}>
        {children}
      </form>
    </Form>
  );
}