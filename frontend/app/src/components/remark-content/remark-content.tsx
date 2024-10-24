'use client';

import { usePortalContainer } from '@/components/portal-provider';
import { cn } from '@/lib/utils';
import { type ReactNode, useEffect, useId, useMemo, useState } from 'react';
import rehypeHighlight from 'rehype-highlight';
import rehypeReact from 'rehype-react';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { getRehypeReactOptions } from './components';
import { RemarkContentContext } from './context';
import { rehypeHighlightOptions } from './highlight';
import '@/components/code-theme.scss';
import '@/components/remark-content/style.scss';

export function RemarkContent ({ className, children = '' }: { className?: string, children: string | undefined }) {
  const portalContainer = usePortalContainer();
  const reactId = useId();

  const processFn = useMemo(() => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight, rehypeHighlightOptions)
      .use(rehypeReact, getRehypeReactOptions({ portalContainer }))
      .freeze();

    return (text: string) => processor.processSync(text).result;
  }, [portalContainer]);

  const [value, setValue] = useState<ReactNode>(processFn(children));

  useEffect(() => {
    if (children) {
      try {
        setValue(processFn(children));
      } catch {
        setValue(<div className="whitespace-pre-wrap">{children}</div>);
      }
    }
  }, [children]);

  return (
    <RemarkContentContext.Provider value={{ reactId, rawContent: children }}>
      <article className={cn('remark-content prose prose-sm prose-zinc dark:prose-invert overflow-x-hidden break-words max-w-[unset]', className)}>
        {value}
      </article>
    </RemarkContentContext.Provider>
  );
}
