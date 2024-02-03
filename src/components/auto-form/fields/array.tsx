import { ArrayFieldInput } from '@/components/auto-form/fields/array.client';
import { StringFieldInput } from '@/components/auto-form/fields/string.client';
import { type FieldProps, getInnerOf, getZodTypeName } from '@/components/auto-form/fields/utils';
import { FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { ReactElement } from 'react';
import { ZodArray } from 'zod';

export function ArrayField ({ schema, name, label, description }: FieldProps) {
  const array = getInnerOf(schema, ZodArray);
  const typeName = getZodTypeName(array.element);
  let el: ReactElement;
  switch (typeName) {
    case 'ZodString':
      el = <StringFieldInput name="never">
        <FormMessage />
      </StringFieldInput>;
      break;
    default:
      el = <>?</>;
  }

  return (
    <FormItem>
      <FormLabel>
        {label}
      </FormLabel>
      <ArrayFieldInput
        name={name}
        element={el}
      >
        <FormMessage />
      </ArrayFieldInput>
      {description && <FormDescription>{description}</FormDescription>}
    </FormItem>
  )
    ;
}