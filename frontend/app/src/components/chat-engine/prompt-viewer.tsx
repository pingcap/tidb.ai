'use client';

import Highlight from 'highlight.js/lib/core';
import django from 'highlight.js/lib/languages/django';
import { useEffect, useState } from 'react';
import '../code-theme.scss';

Highlight.registerLanguage('django', django);

export function PromptViewer ({ value: propValue }: { value: string }) {
  const [value, setValue] = useState(propValue);

  useEffect(() => {
    setValue(propValue);
    try {
      const { value: result } = Highlight.highlight('django', propValue);
      setValue(result);
    } catch {
    }
  }, [propValue]);

  return (
    <code>
      <pre className="whitespace-pre-wrap text-xs font-mono" dangerouslySetInnerHTML={{ __html: value }} />
    </code>
  );
}