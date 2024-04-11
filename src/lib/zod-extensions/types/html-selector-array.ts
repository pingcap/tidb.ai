import { addIssueToContext, type ParseInput, type ParseReturnType, z, ZodType, type ZodTypeDef } from 'zod';

// TODO: rename to ContentExtractionRule is better
export type HtmlSelectorItemType = {
  type?: 'dom-text' | 'dom-content-attr' | undefined
  selector: string
  all?: boolean | undefined
}

const arrayType = z.object({
  type: z.enum(['dom-text', 'dom-content-attr']).optional(),
  selector: z.string(),
  all: z.boolean().optional(),
}).array();

export class HtmlSelectorArray extends ZodType<HtmlSelectorItemType[], HtmlSelectorArray.TypeDef> {
  _parse (input: ParseInput): ParseReturnType<HtmlSelectorItemType[]> {
    const result = arrayType.safeParse(input.data);

    if (result.success) {
      return {
        status: 'valid',
        value: result.data,
      };
    }

    addIssueToContext(input.parent, {
      code: 'custom',
      message: 'not a html selector array',
      path: input.path,
    });

    return {
      status: 'aborted',
    };
  }

}

export namespace HtmlSelectorArray {
  export const typeName = 'X-HtmlSelectorArray';

  export interface TypeDef extends ZodTypeDef {
    typeName: typeof typeName;
  }
}

export function htmlSelectorArray (def: ZodTypeDef = {}) {
  return new HtmlSelectorArray({
    ...def,
    typeName: HtmlSelectorArray.typeName,
  });
}
