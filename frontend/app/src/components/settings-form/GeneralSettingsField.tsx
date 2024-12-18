import { useGeneralSettingsFormContext } from '@/components/settings-form/context';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createColumnHelper} from '@tanstack/table-core'

export interface GeneralSettingsFieldAccessor<Data, FieldData> {
  path: [keyof Data, ...(string | number | symbol)[]]
  get: (data: Readonly<Data>) => FieldData,
  set: (data: Readonly<Data>, value: FieldData) => Data,
}

export function fieldAccessor<Data, Key extends keyof Data> (key: Key): GeneralSettingsFieldAccessor<Data, Data[Key]> {
  return {
    path: [key],
    get: (data) => data[key],
    set: (data, value) => {
      return {
        ...data,
        [key]: value,
      };
    },
  };
}

export function GeneralSettingsField<Data, FieldData> ({
  accessor, schema, children, readonly: fieldReadonly = false,
}: {
  accessor: GeneralSettingsFieldAccessor<Data, FieldData>,
  schema: z.ZodType<FieldData, any, any>,
  readonly?: boolean,
  children: ReactNode,
}) {
  const { data, disabled, readonly, onUpdateField } = useGeneralSettingsFormContext<Data>();
  const form = useForm<{ value: FieldData }>({
    resolver: zodResolver(z.object({
      value: schema,
    })),
    disabled: disabled || readonly || fieldReadonly,
    defaultValues: {
      value: accessor.get(data),
    },
  });

  const handleSubmit = form.handleSubmit(async ({ value }) => {
    await onUpdateField(value, accessor);
    form.reset({
      value,
    });
  });

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleSubmit} onReset={(event) => {
        event.preventDefault();
        form.reset({
          value: accessor.get(data),
        });
      }}>
        {children}
        {!readonly && form.formState.dirtyFields.value && (
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={disabled || readonly || fieldReadonly}>Save</Button>
            <Button type="reset" variant="secondary" disabled={disabled || readonly || fieldReadonly}>Reset</Button>
          </div>
        )}
      </form>
    </Form>
  );
}
