'use client';

import { Nav, NavDrawer } from '@/app/(main)/nav';
import { Branding } from '@/components/branding';
import { SemanticSearch } from '@/components/semantic-search';
import { SiteNavFooter } from '@/components/site-nav-footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster } from '@/components/ui/sonner';
import type { ReactNode } from 'react';

export default function Layout ({ children }: {
  children: ReactNode
}) {
  return (
    <>
      <div className="md:flex md:min-h-screen">
        <header className="md:hidden h-header px-2 sticky top-0 bg-background border-b z-10 flex gap-2 items-center">
          <NavDrawer />
          <Branding />
        </header>
        <div className="fixed top-1.5 right-2 md:top-4 md:right-4 z-10">
          <SemanticSearch />
        </div>
        <aside className="flex-shrink-0 gap-4 w-side h-screen hidden md:block border-r fixed top-0 left-0">
          <div className="h-header flex gap-4 items-center px-4 bg-background border-b">
            <Branding />
          </div>
          <ScrollArea className="h-[calc(100vh-9rem)] pr-2">
            <Nav />
          </ScrollArea>
          <SiteNavFooter className="absolute bottom-0 left-0 bg-background" />
        </aside>
        <main className="flex-1 md:ml-side md:w-content overflow-x-hidden">
          {children}
        </main>
        <Toaster position="top-right" />
      </div>
    </>
  );
}
