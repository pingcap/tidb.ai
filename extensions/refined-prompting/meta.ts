import { rag } from '@/core/interface';
import { promptTemplate } from '@/lib/zod-extensions/types/prompt-template';
import { z } from 'zod';
import earTemplate from './extract-and-refine-question.liquid';
import Readme from './readme.mdx';
import ctxTemplate from './contextualTemplate.liquid';
import nonCtxTemplate from './nonContextualTemplate.liquid';

export type RefinedPromptingOptions = {
  extractAndRefineTemplate?: string
  contextTemplate?: string;
  nonContextTemplate?: string;
  top_k?: number
}
const identifier = 'rag.prompting.refined';
const displayName = 'Refined prompting';
const optionsSchema = z.object({
  contextTemplate: promptTemplate().optional().default(() => ctxTemplate),
  nonContextTemplate: promptTemplate().optional().default(() => nonCtxTemplate),
  extractAndRefineTemplate: promptTemplate().optional().default(() => earTemplate),
  top_k: z.number().optional().default(() => 5),
});

const refinedPromptingMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<RefinedPromptingOptions>;

export default refinedPromptingMeta;
