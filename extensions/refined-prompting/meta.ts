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
  extractAndRefineTemplate: promptTemplate().optional().default(() => earTemplate).describe('Revise Question Template'),
  contextTemplate: promptTemplate().optional().default(() => ctxTemplate).describe('Contextual Template'),
  nonContextTemplate: promptTemplate().optional().default(() => nonCtxTemplate).describe('Non-Contextual Template'),
  top_k: z.number().optional().default(() => 5).describe('Top K'),
});

const refinedPromptingMeta = {
  identifier,
  displayName,
  optionsSchema,
  description: Readme,
} satisfies rag.BaseMeta<RefinedPromptingOptions>;

export default refinedPromptingMeta;
