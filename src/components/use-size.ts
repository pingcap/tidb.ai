import { useEffect, useRef, useState } from 'react';

export function useSize () {
  const [size, setSize] = useState<DOMRectReadOnly | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) {
      const ro = new ResizeObserver(() => {
        setSize(el.getBoundingClientRect());
      });

      setSize(el.getBoundingClientRect());
      ro.observe(el);
      ro.observe(document.documentElement);
      return () => {
        ro.disconnect();
      };
    }
  }, []);

  return {
    ref, size,
  }
}