'use client';

import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';

export function Loader ({ loading, children = 'Loading data' }: { loading: boolean, children?: ReactNode }) {
  const [mounted, setMounted] = useState(loading);

  useEffect(() => {
    if (!loading) {
      const h = setTimeout(() => {
        setMounted(loading);
      }, 200);

      return () => {
        clearTimeout(h);
      };
    } else {
      setMounted(true);
    }
  }, [loading]);

  if (mounted || loading) {
    return (
      <div className={cn(
        'rounded-md absolute z-10 bg-background/90 left-0 top-0 w-full h-full flex items-center justify-center transition-opacity duration-200 select-none',
        loading ? 'opacity-100' : 'opacity-0',
      )}>
        <span className="flex gap-2 items-center">
          <LoaderIcon className="animate-spin" />
          <span>{children}</span>
        </span>
      </div>
    );
  } else {
    return null;
  }

}