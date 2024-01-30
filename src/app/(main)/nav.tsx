'use client';

import { type NavGroup, SiteNav } from '@/components/site-nav';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ActivitySquareIcon, BinaryIcon, ImportIcon, LibraryIcon, MenuIcon, MessageSquareTextIcon } from 'lucide-react';

export function Nav () {
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

const groups: NavGroup[] = [
  {
    items: [
      { href: '/', title: 'Overview', exact: true, icon: ActivitySquareIcon },
      { href: '/ask', title: 'Ask', icon: MessageSquareTextIcon },
      { href: '/explore', title: 'Documents', icon: LibraryIcon },
      { href: '/sources', title: 'Sources', icon: ImportIcon },
    ],
  },
  // {
  //   title: 'Settings',
  //   items: [
  //     { href: '/settings/prompts', title: 'Prompts', icon: TerminalIcon },
  //     { href: '/settings/database', title: 'Database', details: <Status title="Connected" status="green" />, icon: DatabaseIcon },
  //     { href: '/settings/openai', title: 'OpenAI', details: <Status title="Offline" status="red" />, icon: OpenaiIcon },
  //   ],
  // },
  // {
  //   title: 'Security',
  //   items: [
  //     { href: '/settings/security/users', title: 'Users', icon: UsersRound },
  //     { href: '/settings/security/api', title: 'API', icon: Link2Icon, details: <Status title="Disabled" status="gray" /> },
  //     { href: '/settings/security/access-token', title: 'Access Tokens', icon: Fingerprint },
  //   ],
  // },
];
