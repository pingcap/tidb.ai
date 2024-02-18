'use client';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';

import AutoFormObject from './fields/object';
import { Dependency, FieldConfig } from './types';
import { getDefaultValues, getObjectFormSchema, ZodObjectOrWrapped } from './utils';

export function AutoFormSubmit ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Button type="submit" className={className}>
      {children ?? 'Submit'}
    </Button>
  );
}

function AutoForm<SchemaType extends ZodObjectOrWrapped> ({
  id,
  disabled,
  formSchema,
  values: valuesProp,
  onValuesChange: onValuesChangeProp,
  onParsedValuesChange,
  onSubmit: onSubmitProp,
  fieldConfig,
  children,
  className,
  dependencies,
}: {
  id?: string;
  disabled?: boolean;
  formSchema: SchemaType;
  values?: Partial<z.infer<SchemaType>>;
  onValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onParsedValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onSubmit?: (values: z.infer<SchemaType>) => void;
  fieldConfig?: FieldConfig<z.infer<SchemaType>>;
  children?: React.ReactNode;
  className?: string;
  dependencies?: Dependency<z.infer<SchemaType>>[];
}) {
  const objectFormSchema = getObjectFormSchema(formSchema);
  const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> | null =
    getDefaultValues(objectFormSchema);

  const [initialized, setInitialized] = useState(valuesProp != null);

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? undefined,
    values: valuesProp,
    disabled: disabled || !initialized,
  });

  useEffect(() => {
    if (valuesProp && !initialized) {
      setInitialized(true);
      form.reset(valuesProp);
    }
  }, [valuesProp, initialized]);

  function onSubmit (values: z.infer<typeof formSchema>) {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      onSubmitProp?.(parsedValues.data);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          id={id}
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e);
          }}
          onChange={() => {
            const values = form.getValues();
            onValuesChangeProp?.(values);
            const parsedValues = formSchema.safeParse(values);
            if (parsedValues.success) {
              onParsedValuesChange?.(parsedValues.data);
            }
          }}
          className={cn('space-y-5', className)}
        >
          <AutoFormObject
            schema={objectFormSchema}
            form={form}
            dependencies={dependencies}
            fieldConfig={fieldConfig}
          />

          {children}
        </form>
      </Form>
    </div>
  );
}

export default AutoForm;
