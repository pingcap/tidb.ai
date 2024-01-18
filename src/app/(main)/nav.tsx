'use client';

import { type NavGroup, SiteNav } from '@/components/site-nav';
import { Status } from '@/components/status';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Binary, DatabaseIcon, Fingerprint, ImportIcon, LibraryIcon, Link2Icon, ListChecksIcon, MenuIcon, MessageSquareTextIcon, PlayIcon, TerminalIcon, UsersRound } from 'lucide-react';
import OpenaiIcon from './openai-icon';

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
      { href: '/', title: 'Overview', exact: true },
      { href: '/chat', title: 'Chat!', icon: MessageSquareTextIcon },
      { href: '/import', title: 'Import', icon: ImportIcon },
      { href: '/explore', title: 'Explore Documents', icon: LibraryIcon },
      { href: '/playground', title: 'Playground', icon: PlayIcon },
      { href: '/tasks', title: 'Embedding Tasks', details: <Status title="3 failed" status="red" />, icon: ListChecksIcon },
    ],
  },
  {
    title: 'Settings',
    items: [
      { href: '/settings/embedding', title: 'Embedding', icon: Binary },
      { href: '/settings/prompts', title: 'Prompts', icon: TerminalIcon },
      { href: '/settings/database', title: 'Database', details: <Status title="Connected" status="green" />, icon: DatabaseIcon },
      { href: '/settings/openai', title: 'OpenAI', details: <Status title="Offline" status="red" />, icon: OpenaiIcon },
    ],
  },
  {
    title: 'Security',
    items: [
      { href: '/settings/security/users', title: 'Users', icon: UsersRound },
      { href: '/settings/security/api', title: 'API', icon: Link2Icon, details: <Status title="Disabled" status="gray" /> },
      { href: '/settings/security/access-token', title: 'Access Tokens', icon: Fingerprint },
    ],
  },
];
