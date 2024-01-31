'use client';

import { type NavGroup, SiteNav } from '@/components/site-nav';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/lib/auth';
import { ActivitySquareIcon, ImportIcon, LibraryIcon, LogInIcon, MenuIcon, MessagesSquareIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

export function Nav () {
  const user = useUser();

  const groups = useMemo(() => {
    const disableIfNotAuthenticated = !user ? <><Link className="font-semibold underline" href="/auth/login">Login</Link> to continue</> : false;

    const groups: NavGroup[] = [
      {
        items: [
          { href: '/', title: 'Ask', icon: SearchIcon, exact: true },
          { href: '/conversations', title: 'Conversations', exact: true, icon: MessagesSquareIcon, disabled: disableIfNotAuthenticated },
        ],
      },
    ];

    if (!user) {
      groups.push({
        items: [
          { href: '/auth/login', title: 'Login', icon: LogInIcon, className: 'justify-center', variant: 'secondary' },
        ],
      });
    } else {
      groups.push({
        title: 'Management',
        items: [
          { href: '/overview', title: 'Overview', exact: true, icon: ActivitySquareIcon },
          { href: '/explore', title: 'Documents', icon: LibraryIcon },
          { href: '/sources', title: 'Sources', icon: ImportIcon },
        ],
      });
    }

    return groups;
  }, [user]);

  return <SiteNav groups={groups} />;
}

export function NavDrawer () {
  return (
    <Drawer>
      <DrawerTrigger className="flex md:hidden flex-shrink-0" asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-2">
        <ScrollArea className="h-[50vh]">
          <Nav />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
