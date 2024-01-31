import { cloneElement, type ReactElement, type RefObject, useEffect, useRef } from 'react';

export interface AutoScrollProps<T extends HTMLElement> {
  children: ReactElement<{ ref: RefObject<T> }>;
}

/**
 * Scroll target must have a wrapped children.
 * @param children
 * @constructor
 */
export function AutoScroll<T extends HTMLElement> ({ children }: AutoScrollProps<T>) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current?.querySelector('[data-radix-scroll-area-viewport]')
    if (el) {
      const children = el.querySelectorAll('& > *:not(style)')
      if (children.length === 0) {
        throw new Error('invalid radix scroll area.');
      }
      if (children.length > 1) {
        console.warn('invalid radix scroll area.');
      }
      const child = children.item(0)!;

      const ro = new ResizeObserver(() => {
        el.scrollTo({
          top: el.scrollHeight - el.clientHeight,
          behavior: 'smooth',
        });
      });

      ro.observe(child);

      return () => {
        ro.disconnect();
      };
    }
  }, []);

  return cloneElement(children, { ref });
}