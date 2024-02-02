import type { ReactNode } from 'react';

export function AdminPageLayout ({ children }: { children: ReactNode }) {
  return (
    <div className="p-4 pt-16 space-y-4">
      {children}
    </div>
  );
}