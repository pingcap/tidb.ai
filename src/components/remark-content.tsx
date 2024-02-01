import { cache, Suspense, use, useDeferredValue } from 'react';
import * as prod from 'react/jsx-runtime';
import rehypeReact from 'rehype-react';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const production = { Fragment: (prod as any).Fragment, jsx: (prod as any).jsx, jsxs: (prod as any).jsxs };

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeReact, production)
  .freeze();

export function RemarkContent ({ children = '' }: { children: string | undefined }) {
  return (
    <Suspense fallback={<div className="whitespace-pre-wrap">{children}</div>}>
      {useDeferredValue(<RemarkContentInternal text={children} />)}
    </Suspense>
  );
}

const processFn = (text: string) => processor.process(text).then(res => res.result);

const process = typeof window === 'undefined' ? processFn : cache(processFn);

function RemarkContentInternal ({ text }: { text: string }) {
  return use(process(text));
}
