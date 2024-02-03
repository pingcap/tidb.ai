import { sentenceCase } from 'change-case';
import { ZodDefault, type ZodFirstPartySchemaTypes, type ZodFirstPartyTypeKind, ZodObject, ZodOptional, type ZodRawShape, type ZodType } from 'zod';

export type FieldProps<Schema extends ZodFirstPartySchemaTypes = ZodFirstPartySchemaTypes> = {
  schema: Schema
  label: string
  name: string
  description?: string;
}

export function getInner (schema: ZodType): ZodType | undefined {
  if ('innerType' in schema._def) {
    return schema._def.innerType as any;
  } else if ('innerType' in schema) {
    return (schema as any).innerType();
  }
  return undefined;
}

export function getInnerOf<T extends abstract new (...args: any[]) => ZodType> (schema: ZodType, type: T): InstanceType<T> {
  if (schema instanceof type) {
    return schema as InstanceType<T>;
  }
  const inner = getInner(schema);
  if (inner) {
    return getInnerOf(inner, type);
  }
  throw new Error(`No nested ${type.name} schema`);
}

export function getSchemaDescription (schema: ZodFirstPartySchemaTypes) {
  const inner = getInner(schema);

  return inner?.description ?? schema.description;
}

export function getObjectFieldLabel<T extends ZodRawShape> (schema: ZodObject<T>, key: string & keyof T) {
  const fieldSchema = schema.shape[key];

  return getSchemaDescription(fieldSchema) ?? sentenceCase(key);
}

export function isOptional (schema: ZodType) {
  if (schema instanceof ZodOptional) {
    return true;
  }
  const inner = getInner(schema);
  if (inner) {
    return isOptional(inner);
  }
  return false;
}

export function getZodTypeName (schema: ZodType): ZodFirstPartyTypeKind | undefined {
  const inner = getInner(schema);
  if (inner) {
    const type = getZodTypeName(inner);
    if (type) {
      return type;
    }
  }
  if ('typeName' in schema._def) {
    return schema._def.typeName as ZodFirstPartyTypeKind;
  }

  return undefined;
}

export function getZodTypeDefault (schema: ZodType) {
  try {
    const tp = getInnerOf(schema, ZodDefault);
    return tp._def.defaultValue();
  } catch {
    return undefined;
  }
}

export function getZodShapeDefault (schema: ZodObject<any>) {
  const res: any = {};
  Object.entries(schema.shape).forEach(([key, schema]) => {
    res[key] = getZodTypeDefault(schema as any);
  });

  return res;
}
