import { StringFieldInput } from '@/components/auto-form/fields/string.client';
import type { FieldProps } from '@/components/auto-form/fields/utils';
import { FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export function StringField ({ schema, name, label, description }: FieldProps) {
  return (
    <FormItem>
      <FormLabel>
        {label}
      </FormLabel>
      <StringFieldInput name={name}>
        <FormMessage />
      </StringFieldInput>
      {description && <FormDescription>{description}</FormDescription>}
    </FormItem>
  );
}