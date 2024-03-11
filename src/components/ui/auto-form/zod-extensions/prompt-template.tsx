'use client';

import AutoFormLabel from '@/components/ui/auto-form/common/label';
import { AutoFormInputComponentProps } from '@/components/ui/auto-form/types';
import { FormItem } from '@/components/ui/form';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

const AceEditor = dynamic(() =>
  import('react-ace').then(async module => {
    await Promise.all([
      import('ace-builds/src-noconflict/mode-liquid'),
      import('ace-builds/src-noconflict/theme-cloud_editor_dark'),
      import('ace-builds/src-noconflict/theme-cloud_editor'),
      import('ace-builds/src-noconflict/ext-language_tools'),
    ]);
    return module;
  }), { ssr: false });

export const PromptTemplateInput = ({ field, fieldProps, isRequired, label, fieldConfigItem, zodInputProps }: AutoFormInputComponentProps) => {
  const { theme } = useTheme();
  const { value, onChange, name, onBlur, ref, disabled } = field;
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;

  return (
    <FormItem>
      {showLabel && <AutoFormLabel label={label} isRequired={isRequired} />}
      <div className="p-2 border rounded-lg min-h-72">
        <textarea name={name} value={value} readOnly className="hidden" />
        <AceEditor
          name={name}
          className="bg-transparent"
          width="100%"
          height="300px"
          mode="liquid"
          theme={theme === 'dark' ? 'cloud_editor_dark' : 'cloud_editor'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          editorProps={{ $blockScrolling: true, }}
          setOptions={{ disabled, ref,  showLineNumbers: false, wrap: true, wrapBehavioursEnabled: false, behavioursEnabled: false }}
        />
      </div>
    </FormItem>
  );
};
