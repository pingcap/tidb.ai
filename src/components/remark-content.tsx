import { MessageContextSourceCard } from '@/components/chat/message-content-sources';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { HoverCardArrow, HoverCardPortal } from '@radix-ui/react-hover-card';
import { cache, Suspense, use, useDeferredValue, useState } from 'react';
import * as prod from 'react/jsx-runtime';
import rehypeReact, { Options as RehypeReactOptions } from 'rehype-react';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const production: RehypeReactOptions = {
  Fragment: (prod as any).Fragment,
  jsx: (prod as any).jsx,
  jsxs: (prod as any).jsxs,
  components: {
    section ({ ...props }) {
      if (!(props as any)['data-footnotes']) return <section {...props} />;
      return (
        <section {...props} className={cn(props.className, 'sr-only')} />
      );
    },
    a ({ ...props }) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [link, setLink] = useState<{ title: string, href: string }>();

      if (!(props as any)['data-footnote-ref']) return <a {...props} />;

      return (
        <HoverCard openDelay={0} onOpenChange={open => {
          if (open) {
            const id = props.href?.replace(/^#/, '');
            if (id) {
              const li = document.getElementById(id);
              if (li) {
                const a = li.querySelector(`a:first-child`) as HTMLAnchorElement | null;
                if (a) {
                  setLink({ title: a.textContent ?? a.href, href: a.href });
                  return;
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
              <MessageContextSourceCard title={link?.title} href={link?.href} />
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
