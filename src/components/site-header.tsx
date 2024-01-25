'use client';
import { Status } from '@/components/status';
import { ThemeToggle } from '@/components/theme-toggle';
import { Input } from '@/components/ui/input';
import type { ReactNode } from 'react';

export function SiteHeader ({ prefix }: { prefix?: ReactNode, }) {
  return (
    <header className="h-12 flex gap-4 items-center px-2 md:px-4 lg:px-8 sticky top-0 bg-background z-10 branding">
      {prefix}
      <img src='/logo.png' alt='logo' width={36} height={36} className='rounded-full' />
      <span className="text-lg font-semibold flex-shrink-0 text-primary-foreground">
        Create RAG App
      </span>
      <Input className="border-none w-60 h-8 text-foreground" placeholder="Search..." />
      <span className="ml-auto text-xs text-muted-foreground flex-shrink-0">
        <Status status="gray" title={`v0.0.0`} />
      </span>
      <ThemeToggle />
    </header>
  );
}
