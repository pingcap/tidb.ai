'use client';
import type { ReactNode } from 'react';

export function SiteHeader ({ prefix }: { prefix?: ReactNode, }) {
  return (
    <header className="h-header flex gap-4 items-center px-2 md:px-4 lg:px-8 bg-background border-b">
      {prefix}
      <span className="flex items-center gap-1">
        <img src="/tidb-ai.svg" alt="logo" width={24} height={24} />
        <span className="text-lg font-semibold flex-shrink-0">
          TiDB.AI
        </span>
      </span>
    </header>
  );
}
