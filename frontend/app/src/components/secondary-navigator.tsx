'use client';

import { NextLink } from '@/components/nextjs/NextLink';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const NAV_WIDTH = '14rem';

declare module 'react' {
  export interface CSSProperties {
    '--secondary-sidebar-width'?: string;
  }
}

export function SecondaryNavigatorLayout ({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-6 w-full" style={{ '--secondary-sidebar-width': NAV_WIDTH }}>
      {children}
    </div>
  );
}

export function SecondaryNavigator ({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-2 w-[--secondary-sidebar-width] flex-shrink-0">
      {children}
    </div>
  );
}

export function SecondaryNavigatorLink ({ pathname, children }: { pathname: string, children: ReactNode }) {
  const current = usePathname();
  const active = current === pathname;

  return (
    <NextLink href={pathname} size="sm" className={cn('w-full justify-start', active ? 'font-semibold' : 'font-normal')} variant={active ? 'secondary' : 'ghost'}>
      {children}
    </NextLink>
  );
}
