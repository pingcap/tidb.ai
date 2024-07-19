'use client';

import { HtmlViewer } from '@/components/html-viewer';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const base = process.env.SITE_URL || '';

export function WidgetSnippet () {
  const [copied, setCopied] = useState(false);

  const [url, setUrl] = useState(base + '/widget.js');

  const script = `<script src="${url}" async></script>`

  useEffect(() => {
    if (!process.env.SITE_URL) {
      setUrl(location.origin + '/widget.js');
    }
  }, []);

  return (
    <div className="rounded-lg p-2 border mb-4 relative bg-foreground/5">
      <div className='text-xs font-mono opacity-30 select-none'>&lt;<span className='hljs-name'>html</span>&gt;</div>
      <div className='text-xs font-mono opacity-30 select-none'>&lt;<span className="hljs-name">body</span>&gt;</div>
      <div className='text-xs font-mono opacity-30 select-none whitespace-pre'>  ...</div>
      <HtmlViewer value={`  ${script}`} />
      <div className="text-xs font-mono opacity-30 select-none">&lt;/<span className="hljs-name">body</span>&gt;</div>
      <div className='text-xs font-mono opacity-30 select-none'>&lt;/<span className='hljs-name'>html</span>&gt;</div>
      <Button variant="secondary" size='sm' className='absolute top-0.5 right-0.5 select-none' onClick={() => {
        navigator.clipboard.writeText(script);
        setCopied(true);
      }}>
        {copied ? 'Copied' : 'Copy'}
      </Button>
    </div>
  );
}