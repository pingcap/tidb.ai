import type { ReactNode } from 'react';

export function AdminPageLayout ({ children }: { children: ReactNode }) {
  return (
    <div className="p-4 space-y-4 h-[calc(100%-2rem)]">
      {children}
    </div>
  );
}