import { type ParseInput, type ParseReturnType, z, ZodType, type ZodTypeDef } from 'zod';

const string = z.string();

export class PromptTemplate extends ZodType<string, PromptTemplate.TypeDef> {

  _parse (input: ParseInput): ParseReturnType<string> {
    return string._parse(input);
  }
}

export namespace PromptTemplate {
  export const typeName = 'X-PromptTemplate';

  export interface TypeDef extends ZodTypeDef {
    typeName: typeof typeName;
  }
}

export function promptTemplate (def: ZodTypeDef = {}) {
  return new PromptTemplate({
    ...def,
    typeName: PromptTemplate.typeName,
  });
}