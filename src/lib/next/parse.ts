import { NextRequest } from 'next/server';
import { z, ZodArray, ZodObject, ZodOptional, ZodType } from 'zod';

export function parseSearchParams<ZT extends ZodObject<any>> (usp: URLSearchParams, schema: ZT) {
  const result: z.infer<ZT> = {};

  Object.entries(schema.shape).forEach(([name, schema]) => {
    const key = name as keyof z.infer<ZT>;
    if (schema instanceof ZodType) {
      let realType = schema;
      if (schema instanceof ZodOptional) {
        realType = schema._def.innerType;
      }

      if (realType instanceof ZodArray) {
        result[key] = schema.parse(usp.getAll(name).map(decodeURIComponent)) as any;
      } else {
        let rawVal = usp.get(name) ?? undefined;
        if (rawVal) {
          rawVal = decodeURIComponent(rawVal);
        }
        result[key] = schema.parse(rawVal);
      }
    }
  });

  return result;
}

export function parseParams<ZT extends ZodObject<any>> (params: { [key: string]: string | string[] | undefined }, schema: ZT) {
  const result: z.infer<ZT> = {};

  Object.entries(schema.shape).forEach(([name, schema]) => {
    const key = name as keyof z.infer<ZT>;
    if (schema instanceof ZodType) {
      if (schema instanceof ZodArray) {
        const value = params[name];
        if (value) {
          if (value instanceof Array) {
            result[key] = schema.parse(value.map(decodeURIComponent)) as any;
          } else {
            result[key] = schema.parse([decodeURIComponent(value)]) as any;
          }
        } else {
          result[key] = schema.parse([]) as any;
        }
      } else {
        let rawVal = params[name];
        if (rawVal instanceof Array) {
          rawVal = rawVal.map(decodeURIComponent);
        } else if (rawVal) {
          rawVal = decodeURIComponent(rawVal);
        }
        result[key] = schema.parse(rawVal);
      }
    }
  });

  return result;
}

export async function parseBody<ZT extends ZodType> (req: NextRequest, schema: ZT) {
  return schema.parse(await req.json());
}


