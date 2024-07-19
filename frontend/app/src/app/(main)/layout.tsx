'use client';

import { Nav, NavDrawer } from '@/app/(main)/nav';
import { Branding } from '@/components/branding';
import { SiteNavActionBar, SiteNavFooter, type SiteSocialsType } from '@/components/site-nav-footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster } from '@/components/ui/sonner';
import { useSettingContext } from '@/components/website-setting-provider';
import Link from 'next/link';
import { ReactNode, useMemo } from 'react';

export default function Layout ({ children }: {
  children: ReactNode
}) {
  const setting = useSettingContext();

  const socialMemo: SiteSocialsType = useMemo(
    () => ({
      discord: setting.social_discord,
      twitter: setting.social_twitter,
      github: setting.social_github,
    }),
    [setting],
  );

  return (
    <>
      <div className="md:flex md:min-h-screen">
        <header className="md:hidden h-header px-2 sticky top-0 bg-background border-b z-10 flex gap-2 items-center">
          <NavDrawer />
          <Branding setting={setting} />
        </header>
        <div className="fixed top-0 right-2 md:top-4 md:right-4 z-10">
          <div className="flex gap-2 items-center">
            <SiteNavActionBar className="flex h-fit" social={socialMemo} />
          </div>
        </div>
        <aside className="flex-shrink-0 gap-4 w-side h-full hidden md:block border-r fixed top-0 left-0">
          <Link className="h-header flex gap-4 items-left justify-left px-4 py-8 bg-background" href="/" prefetch={false}>
            <Branding setting={setting} />
          </Link>
          <ScrollArea className="h-[calc(100%-6rem)] pr-2">
            <div className="w-side">
              <Nav />
            </div>
          </ScrollArea>
          <SiteNavFooter className="absolute bottom-0 left-0 bg-background" />
        </aside>
        <main className="flex-1 md:ml-side md:w-content overflow-x-hidden">
          {children}
        </main>
      </div>
    </>
  );
}
