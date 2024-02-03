import { NumberFieldInput } from '@/components/auto-form/fields/number.client';
import { type FieldProps, getZodTypeDefault } from '@/components/auto-form/fields/utils';
import { FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export function NumberField ({ schema, name, label, description }: FieldProps) {
  return (
    <FormItem>
      <FormLabel>
        {label}
      </FormLabel>
      <NumberFieldInput name={name} defaultValue={getZodTypeDefault(schema)}>
        <FormMessage />
      </NumberFieldInput>
      {description && <FormDescription>{description}</FormDescription>}
    </FormItem>
  );
}