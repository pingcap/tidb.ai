'use client';

import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useState } from 'react';

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

export const LiquidEditor = ({ name, defaultValue }: { name?: string, defaultValue?: string }) => {
  const { theme } = useTheme();
  const [value, setValue] = useState(defaultValue ?? '');

  return (
    <div className="p-2 border rounded-lg min-h-72">
      <textarea name={name} value={value} readOnly className="hidden" />
      <AceEditor
        name={name}
        className="bg-transparent"
        width="100%"
        height="300px"
        mode="liquid"
        theme={theme === 'dark' ? 'cloud_editor_dark' : 'cloud_editor'}
        onChange={e => setValue(e)}
        defaultValue={defaultValue}
        editorProps={{ $blockScrolling: true }}
        setOptions={{ showLineNumbers: false, wrap: true }}
      />
    </div>
  );
};
