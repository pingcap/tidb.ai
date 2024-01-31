import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface StatusProps {
  className?: string;
  status?: 'green' | 'red' | 'blue' | 'gray' | undefined;
  title: ReactNode;
  simple?: boolean
}

export function Status ({ className, simple, status, title }: StatusProps) {
  return (
    <div className={cn(
      'inline-flex items-center bg-primary/10 text-foreground rounded-full justify-center gap-2 flex-shrink-0 px-1.5 py-0.5 select-none',
      simple && 'bg-transparent text-foreground',
      className
    )}>
      {title && <span className="text-xs">{title}</span>}
      {status && <span className={cn('flex-shrink-0 w-2 h-2 rounded-full', { 'bg-green-400': status === 'green', 'bg-red-400': status === 'red', 'bg-gray-400': status === 'gray', 'bg-blue-400': status === 'blue' })} />}
    </div>
  );
}