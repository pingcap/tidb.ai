import {HTMLSelectorSchema} from "@/lib/zod-extensions/types/html-selector-array";
import {addIssueToContext, ParseInput, ParseReturnType, z, ZodType, type ZodTypeDef} from "zod";

export enum ExtractValueMethod {
  TEXT = 'text',
  MARKDOWN = 'markdown',
  ATTR = 'attr',
  PROP = 'prop',
}

export const ExtractValueMethodSchema = z.nativeEnum(ExtractValueMethod);

export const HTMLExtractorSchema = HTMLSelectorSchema.extend({
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

export type HTMLExtractor = z.infer<typeof HTMLExtractorSchema>;

export const HTMLExtractorArraySchema = HTMLExtractorSchema.array();

export class HTMLExtractorArray extends ZodType<HTMLExtractor[], HTMLExtractorArray.TypeDef> {
  _parse (input: ParseInput): ParseReturnType<HTMLExtractor[]> {
    const result = HTMLExtractorArraySchema.safeParse(input.data);

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

export namespace HTMLExtractorArray {
  export const typeName = 'X-HtmlExtractorArray';

  export interface TypeDef extends ZodTypeDef {
    typeName: typeof typeName;
  }
}

export function htmlExtractorArray (def: ZodTypeDef = {}) {
  return new HTMLExtractorArray({
    ...def,
    typeName: HTMLExtractorArray.typeName,
  });
}