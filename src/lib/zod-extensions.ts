import { addIssueToContext, type ParseInput, type ParseReturnType, undefined, ZodType, type ZodTypeDef } from 'zod';

interface ZodEnvDef extends ZodTypeDef {
  typeName: 'ZodEnvString';
  env: string;
}

class ZodEnvString extends ZodType<string, ZodEnvDef> {
  static readonly typeName = 'ZodEnvString';

  _parse (input: ParseInput): ParseReturnType<string> {
    let value: any;
    if (input.data == null) {
      value = process.env[this._def.env];
    } else {
      value = input.data;
    }

    if (typeof value !== 'string') {
      addIssueToContext(input.parent, { code: 'invalid_type', received: typeof value, expected: 'string', path: input.path, fatal: true });
      return {
        status: 'aborted',
      };
    }

    return {
      status: 'valid',
      value,
    };
  }
}

export function env (name: string, def?: ZodTypeDef) {
  return new ZodEnvString({
    ...def,
    env: name,
    typeName: ZodEnvString.typeName,
  });
}
