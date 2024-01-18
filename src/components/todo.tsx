import type { ReactNode } from 'react';

export function Todo ({ children = 'TODO' }: { children: ReactNode }) {
  return (
    <div className="w-full h-[800px] bg-secondary text-secondary-foreground flex items-center justify-center text-xl font-bold">
      {children}
    </div>
  );
}