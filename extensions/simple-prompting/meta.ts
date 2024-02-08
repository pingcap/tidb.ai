import { rag } from '@/core/interface';
import { z } from 'zod';
import Readme from './readme.mdx';
import defaultTemplate from './template.liquid';

export type SimplePromptingOptions = {
  template?: string
  top_k?: number
}
const identifier = 'rag.prompting.simple';
const displayName = 'Simple prompting';
const optionsSchema = z.object({
  template: z.string().optional().default(() => defaultTemplate),
  top_k: z.number().optional().default(() => 5),
});

const simplePromptingMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<SimplePromptingOptions>;

export default simplePromptingMeta;
