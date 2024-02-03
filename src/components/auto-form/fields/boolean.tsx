import { BooleanFieldInput } from '@/components/auto-form/fields/boolean.client';
import type { FieldProps } from '@/components/auto-form/fields/utils';
import { FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export function BooleanField ({ schema, name, label, description }: FieldProps) {
  return (
    <FormItem>
      <div className='flex items-center gap-2'>
        <BooleanFieldInput name={name}>
          <FormMessage />
        </BooleanFieldInput>
        <FormLabel>
          {label}
        </FormLabel>
      </div>
      {description && <FormDescription>{description}</FormDescription>}
    </FormItem>
  );
}