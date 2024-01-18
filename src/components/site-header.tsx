'use client';
import { Status } from '@/components/status';
import { ThemeToggle } from '@/components/theme-toggle';
import { Input } from '@/components/ui/input';
import type { ReactNode } from 'react';

export function SiteHeader ({ prefix }: { prefix?: ReactNode, }) {
  return (
    <header className="h-16 flex gap-4 items-center px-2 md:px-4 lg:px-8 sticky top-0 bg-background border-b z-10">
      {prefix}
      <span className="text-lg font-semibold flex-shrink-0">
        Another RAG app
      </span>
      <Input className="border-none w-60 h-8" placeholder="Search..." />
      <span className="ml-auto text-xs text-muted-foreground flex-shrink-0">
        <Status status="gray" title={`v0.0.0 outdated`} />
      </span>
      <ThemeToggle />
    </header>
  );
}
