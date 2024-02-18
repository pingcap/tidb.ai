import { addIssueToContext, type ParseInput, type ParseReturnType, z, ZodType, type ZodTypeDef } from 'zod';

const arrayString = z.string().array();

export class SeparatorArray extends ZodType<string[], SeparatorArray.TypeDef> {
  _parse (input: ParseInput): ParseReturnType<string[]> {
    const result = arrayString.safeParse(input.data);

    if (result.success) {
      return {
        status: 'valid',
        value: result.data,
      };
    }

    addIssueToContext(input.parent, {
      code: 'custom',
      message: 'not a separator characters array',
      path: input.path,
    });

    return {
      status: 'aborted',
    };
  }
}

export namespace SeparatorArray {
  export const typeName = 'Biz-SeparatorArray';

  export interface TypeDef extends ZodTypeDef {
    typeName: typeof SeparatorArray.typeName;
  }
}

export function separators (def: ZodTypeDef = {}) {
  return new SeparatorArray({
    ...def,
    typeName: SeparatorArray.typeName,
  });
}
