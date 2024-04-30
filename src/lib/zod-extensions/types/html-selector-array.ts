import { addIssueToContext, type ParseInput, type ParseReturnType, z, ZodType, type ZodTypeDef } from 'zod';

/**
 * HTML Selector
 */

export const HTMLSelectorSchema = z.object({
  /**
   * The HTML selector to extract the metadata.
   */
  selector: z.string(),
  /**
   * Whether to select all elements.
   */
  all: z.boolean().default(false).optional(),
});

export type HTMLSelector = z.infer<typeof HTMLSelectorSchema>;

export const HTMLSelectorArraySchema = HTMLSelectorSchema.array();

export class HTMLSelectorArray extends ZodType<HTMLSelector[], HTMLSelectorArray.TypeDef> {

  _parse (input: ParseInput): ParseReturnType<HTMLSelector[]> {
    const result = HTMLSelectorArraySchema.safeParse(input.data);

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

export namespace HTMLSelectorArray {
  export const typeName = 'X-HtmlSelectorArray';

  export interface TypeDef extends ZodTypeDef {
    typeName: typeof typeName;
  }
}

export function htmlSelectorArray (def: ZodTypeDef = {}) {
  return new HTMLSelectorArray({
    ...def,
    typeName: HTMLSelectorArray.typeName,
  });
}
