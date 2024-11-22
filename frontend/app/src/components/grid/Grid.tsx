import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Grid2 ({ children, className }: { className?: string, children: ReactNode }) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2', className)}>
      {children}
    </div>
  );
}

export function Grid3 ({ children, className }: { className?: string, children: ReactNode }) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2 xl:grid-cols-3', className)}>
      {children}
    </div>
  );
}
