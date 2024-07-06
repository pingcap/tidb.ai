import type { ReactNode } from 'react';

export function AdminPageLayout ({ children }: { children: ReactNode }) {
  return (
    <div className="p-6 space-y-6 h-[calc(100%-2rem)]">
      {children}
    </div>
  );
}