import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Divider ({ className, children }: { className: string, children: ReactNode }) {
  return (
    <div className={cn('flex justify-between items-center gap-2', className)}>
      <span className="flex-1 max-h-[1px] min-h-[1px] bg-border" />
      <span>{children}</span>
      <span className="flex-1 max-h-[1px] min-h-[1px] bg-border" />
    </div>
  );
}