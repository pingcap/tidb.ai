import { HtmlSelectorArrayInput } from '@/components/ui/auto-form/zod-extensions/html-selector-array';
import { PromptTemplateInput } from '@/components/ui/auto-form/zod-extensions/prompt-template';
import { SeparatorArrayInput } from '@/components/ui/auto-form/zod-extensions/separator-array';
import { HtmlSelectorArray } from '@/lib/zod-extensions/types/html-selector-array';
import { PromptTemplate } from '@/lib/zod-extensions/types/prompt-template';
import { SeparatorArray } from '@/lib/zod-extensions/types/separator-array';
import AutoFormCheckbox from './fields/checkbox';
import AutoFormDate from './fields/date';
import AutoFormEnum from './fields/enum';
import AutoFormFile from './fields/file';
import AutoFormInput from './fields/input';
import AutoFormNumber from './fields/number';
import AutoFormRadioGroup from './fields/radio-group';
import AutoFormSwitch from './fields/switch';
import AutoFormTextarea from './fields/textarea';

export const INPUT_COMPONENTS = {
  checkbox: AutoFormCheckbox,
  date: AutoFormDate,
  select: AutoFormEnum,
  radio: AutoFormRadioGroup,
  switch: AutoFormSwitch,
  textarea: AutoFormTextarea,
  number: AutoFormNumber,
  file: AutoFormFile,
  fallback: AutoFormInput,
  [SeparatorArray.typeName]: SeparatorArrayInput,
  [HtmlSelectorArray.typeName]: HtmlSelectorArrayInput,
  [PromptTemplate.typeName]: PromptTemplateInput,
};

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS;
} = {
  ZodBoolean: 'checkbox',
  ZodDate: 'date',
  ZodEnum: 'select',
  ZodNativeEnum: 'select',
  ZodNumber: 'number',
  [SeparatorArray.typeName]: SeparatorArray.typeName,
  [HtmlSelectorArray.typeName]: HtmlSelectorArray.typeName,
  [PromptTemplate.typeName]: PromptTemplate.typeName,
};
