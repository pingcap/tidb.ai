import { addIssueToContext, type ParseInput, type ParseReturnType, ZodFirstPartyTypeKind, ZodOptional, type ZodOptionalDef, ZodType, type ZodTypeDef } from 'zod';

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

  optional () {
    class ZodOptionalEnvString extends ZodOptional<this> {

      constructor (def: any) {
        super(def);
      }

      _parse (input: ParseInput): ParseReturnType<this['_output']> {

        let value: any;
        if (input.data == null) {
          value = process.env[this._def.innerType._def.env];
          if (value == null) {
            return {
              status: 'valid',
              value,
            };
          }
        }

        return super._parse(input);
      }
    }

    return new ZodOptionalEnvString({
      innerType: this,
      typeName: ZodFirstPartyTypeKind.ZodOptional,
    });
  }
}


export function env (name: string, def?: ZodTypeDef) {
  return new ZodEnvString({
    ...def,
    env: name,
    typeName: ZodEnvString.typeName,
  });
}
