import { MessageContextSourceCard } from '@/components/chat/message-content-sources';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { HoverCardArrow, HoverCardPortal } from '@radix-ui/react-hover-card';
import { cache, cloneElement, createContext, Suspense, use, useContext, useDeferredValue, useId, useState } from 'react';
import { isElement, isFragment } from 'react-is';
import * as prod from 'react/jsx-runtime';
import rehypeReact, { Options as RehypeReactOptions } from 'rehype-react';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

function dirtyRewrite (some: any, id: string): any {
  if (some == null) return some;
  if (typeof some !== 'object') return some;

  if (isElement(some) || isFragment(some)) {
    return cloneElement(some, {
      ...some.props,
      ...some.props.id ? { id: `${id}--${some.props.id}` } : {},
      children: dirtyRewrite(some.props.children, id),
    });
  }

  if (some instanceof Array) {
    return some.map(item => dirtyRewrite(item, id));
  }

  return some;
}

const production: RehypeReactOptions = {
  Fragment: (prod as any).Fragment,
  jsx: (prod as any).jsx,
  jsxs: (prod as any).jsxs,
  components: {
    section ({ ...props }) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const reactId = useContext(RemarkContentContext);

      if (!(props as any)['data-footnotes']) return <section {...props} />;
      return (
        <section {...props} className={cn(props.className /*, 'sr-only'*/)}>
          {dirtyRewrite(props.children, reactId)}
        </section>
      );
    },
    a ({ ...props }) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const reactId = useContext(RemarkContentContext);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [link, setLink] = useState<{ title: string, href: string | false }>();

      if (!(props as any)['data-footnote-ref']) return <a {...props} />;

      return (
        <HoverCard openDelay={0} onOpenChange={open => {
          if (open) {
            const id = props.href?.replace(/^#/, '');
            if (id) {
              const li = document.getElementById(reactId + '--' + id);
              if (li) {
                const a = li.querySelector(`a:first-child:not([data-footnote-backref])`) as HTMLAnchorElement | null;
                if (a) {
                  setLink({ title: a.textContent ?? a.href, href: a.href });
                  return;
                } else {
                  const text = li.querySelector('p')?.childNodes?.item(0)?.textContent;
                  if (text) {
                    setLink({ title: text, href: false });
                    return;
                  }
                }
              }
            }
            setLink(undefined);
          }
        }}>
          <HoverCardTrigger asChild>
            <a
              {...props}
              className={cn(props.className, 'cursor-default')}
              href={undefined}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
              }}
            />
          </HoverCardTrigger>
          <HoverCardPortal>
            <HoverCardContent onPointerDownOutside={e => e.preventDefault()} className="p-1 w-[200px] overflow-hidden rounded-lg border text-xs">
              <HoverCardArrow className="fill-border" />
              {link
                ? link.href
                  ? <MessageContextSourceCard title={link?.title} href={link?.href} />
                  : link.title
                : null}
            </HoverCardContent>
          </HoverCardPortal>
        </HoverCard>
      );
    },
  },
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeReact, production)
  .freeze();

const RemarkContentContext = createContext<string>('');

export function RemarkContent ({ children = '' }: { children: string | undefined }) {
  const id = useId();

  return (
    <RemarkContentContext.Provider value={id}>
      <Suspense fallback={<div className="whitespace-pre-wrap">{children}</div>}>
        {useDeferredValue(<RemarkContentInternal text={children} />)}
      </Suspense>
    </RemarkContentContext.Provider>
  );
}

const processFn = (text: string) => processor.process(text).then(res => res.result);

const process = typeof window === 'undefined' ? processFn : cache(processFn);

function RemarkContentInternal ({ text }: { text: string }) {
  return use(process(text));
}
