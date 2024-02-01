import type { ReactNode } from 'react';

export function Highlight ({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-lg bg-primary text-primary-foreground">
      {children}
    </span>
  );
}