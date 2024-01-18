import type { ReactNode } from 'react';

export function Placeholder ({ children }: { children: ReactNode }) {
  return (
    <div className="py-20 px-4 text-foreground/50 flex items-center justify-center text-xl font-bold">
      {children}
    </div>
  );
}