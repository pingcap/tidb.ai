import { fieldMaps } from '@/components/auto-form/fields';
import { type FieldProps, getSchemaDescription, getZodTypeName } from '@/components/auto-form/fields/utils';
import { capitalCase } from 'change-case';
import { type ComponentType, useMemo } from 'react';
import { type ZodFirstPartySchemaTypes, type ZodObject, type ZodType } from 'zod';

export function ObjectShape ({ name, schema }: { name: string | undefined, schema: ZodObject<any> }) {
  const fields = useFields(schema, name);

  return (
    <fieldset className="space-y-4">
      {fields.map(({ component: Field, ...props }) => (
        <Field {...props} />
      ))}
    </fieldset>
  );
}

function useFields (object: ZodObject<any>, name: string | undefined) {
  return useMemo(() => {
    return Object.entries(object.shape).map(([key, schema]) => ({
      name: concatName(name, key),
      label: capitalCase(key),
      description: getSchemaDescription(schema as any),
      schema: schema as ZodFirstPartySchemaTypes,
      component: fieldMaps[getZodTypeName(schema as ZodType) ?? 'ZodAny'] ?? (() => null),
    }));
  }, [object]) satisfies (FieldProps & { component?: ComponentType<FieldProps> })[];
}

function concatName (parent: string | undefined, name: string) {
  if (parent) {
    return parent + '.' + name;
  }
  return name;
}
