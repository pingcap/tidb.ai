'use client';

import AutoForm from '@/components/ui/auto-form';
import { HtmlLoader } from '@/rag-spec/loaders/HtmlLoader';

export interface HtmlLoaderFormProps {
  id?: string;
  disabled?: boolean;
  options?: HtmlLoader.Options;

  onSubmit (options: HtmlLoader.Options): void;

  onValuesChange (options: HtmlLoader.Options): void;

  onParsedValuesChange (options: HtmlLoader.Options): void;
}

export function HtmlLoaderForm ({
  id,
  disabled,
  options,
  onSubmit,
  onParsedValuesChange,
  onValuesChange,
}: HtmlLoaderFormProps) {
  return (
    <AutoForm
      className='max-w-screen-sm'
      id={id}
      disabled={disabled}
      formSchema={HtmlLoader.optionsSchema}
      values={options}
      onValuesChange={onValuesChange}
      onParsedValuesChange={onParsedValuesChange}
      onSubmit={onSubmit}
    >
    </AutoForm>
  );
}
