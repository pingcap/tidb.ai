import { ObjectShape } from '@/components/auto-form/object-shape';
import type { FieldValues } from 'react-hook-form';
import { type ZodObject } from 'zod';

export interface AutoFormProps<T extends FieldValues> {
  schema: ZodObject<any, any, any, T>;
}

export function AutoFormFields<T extends FieldValues> ({
  schema,
}: AutoFormProps<T>) {
  return <ObjectShape name={undefined} schema={schema} />;
}