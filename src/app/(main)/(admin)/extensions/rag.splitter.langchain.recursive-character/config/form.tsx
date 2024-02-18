'use client';

import AutoForm from '@/components/ui/auto-form';
import { RecursiveCharacterTextSplitter } from '@/rag-spec/spliter/RecursiveCharacterTextSplitter';

export interface RecursiveCharacterSplitterFormProps {
  id?: string;
  disabled?: boolean;
  options?: RecursiveCharacterTextSplitter.Options;

  onSubmit (options: RecursiveCharacterTextSplitter.Options): void;

  onValuesChange (options: RecursiveCharacterTextSplitter.Options): void;

  onParsedValuesChange (options: RecursiveCharacterTextSplitter.Options): void;
}

export function RecursiveCharacterSplitterForm ({
  id,
  disabled,
  options,
  onSubmit,
  onParsedValuesChange,
  onValuesChange,
}: RecursiveCharacterSplitterFormProps) {
  return (
    <AutoForm
      className='max-w-screen-sm'
      id={id}
      disabled={disabled}
      formSchema={RecursiveCharacterTextSplitter.optionsSchema}
      values={options}
      onValuesChange={onValuesChange}
      onParsedValuesChange={onParsedValuesChange}
      onSubmit={onSubmit}
    >
    </AutoForm>
  );
}
