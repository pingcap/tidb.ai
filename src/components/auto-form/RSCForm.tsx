import { Form } from '@/components/ui/form';
import { handleErrors } from '@/lib/fetch';
import { type ReactNode } from 'react';
import { type DefaultValues, type FieldValues, useForm } from 'react-hook-form';

export function RSCForm<T extends FieldValues> ({
  resolverApi,
  onSubmit,
  children,
  className,
  defaultValues,
}: {
  resolverApi: string,
  onSubmit: (value: T) => Promise<void>,
  children: ReactNode,
  className?: string,
  defaultValues: DefaultValues<T>,
}) {
  const form = useForm<T>({
    resolver: async (values, context, options) => {
      return await fetch(resolverApi, {
        method: 'POST',
        body: JSON.stringify([values, context, options]),
      }).then(handleErrors).then(res => res.json());
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Form {...form}>
      <form className={className} onSubmit={handleSubmit}>
        {children}
      </form>
    </Form>
  );
}