import { addIssueToContext, type ParseInput, type ParseReturnType, z, ZodType, type ZodTypeDef } from 'zod';


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

export class HtmlSelectorArray extends ZodType<HTMLSelector[], HtmlSelectorArray.TypeDef> {

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

export enum ExtractValueMethod {
  TEXT = 'text',
  ATTR = 'attr',
  PROP = 'prop',
}

export const ExtractValueMethodSchema = z.nativeEnum(ExtractValueMethod);

export const HTMLExecutorSchema = HTMLSelectorSchema.extend({
  /**
   * The method to extract the value.
   */
  extract: ExtractValueMethodSchema.default(ExtractValueMethod.TEXT).optional(),
  /**
   * The attribute to extract the value.
   */
  attr: z.string().optional(),
  /**
   * The property to extract the value.
   */
  prop: z.enum(['innerHTML', 'outerHTML', 'innerText', 'textContent']).optional(),
  /**
   * The default value to be used if the value is not found.
   */
  default: z.string().optional(),
});

export type HTMLExecutor = z.infer<typeof HTMLExecutorSchema>;
