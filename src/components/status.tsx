import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Status ({ className, status, title }: { className?: string, status: 'green' | 'red' | 'gray', title: ReactNode }) {
  return (
    <div className={cn('inline-flex items-center bg-primary/40 text-primary-foreground rounded-full justify-center gap-2 flex-shrink-0 px-1.5 py-0.5', className)}>
      {title && <span className="text-xs">{title}</span>}
      <span className={cn('flex-shrink-0 w-2 h-2 rounded-full', { 'bg-green-400': status === 'green', 'bg-red-400': status === 'red', 'bg-gray-400': status === 'gray' })} />
    </div>
  );
}