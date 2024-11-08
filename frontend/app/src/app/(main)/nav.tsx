'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { ChatNewDialog } from '@/components/chat/chat-new-dialog';
import { ChatsHistory } from '@/components/chat/chats-history';
import { type NavGroup, SiteNav } from '@/components/site-nav';
import { SiteNavFooter } from '@/components/site-nav-footer';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useHref } from '@/components/use-href';
import { ActivitySquareIcon, BinaryIcon, BotMessageSquareIcon, BrainCircuitIcon, CogIcon, FilesIcon, HomeIcon, KeyRoundIcon, LibraryBigIcon, LibraryIcon, MenuIcon, MessageCircleQuestionIcon, MessagesSquareIcon, ShuffleIcon } from 'lucide-react';
import Link from 'next/link';

export function Nav () {
  const href = useHref();
  const auth = useAuth();
  const user = auth.me;
  const isLoggedIn = !!user; // TODO: wait for server

  const disableIfNotAuthenticated = !isLoggedIn ? <><Link className="font-semibold underline" href={`/auth/login?callbackUrl=${encodeURIComponent(href)}`}>Login</Link> to continue</> : false;

  const groups: NavGroup[] = [
    {
      items: [
        { custom: true, key: 'new-chat', children: <ChatNewDialog /> },
        { href: '/', title: 'Home', icon: HomeIcon, exact: true },
        { href: '/c', title: 'Conversations', exact: true, icon: MessagesSquareIcon, disabled: disableIfNotAuthenticated },
        { custom: true, key: 'history', children: <ChatsHistory /> },
      ],
    },
  ];

  if (user?.is_superuser) {
    groups.push({
      title: 'Admin',
      items: [
        // { href: '/dashboard', title: 'Overview', icon: ActivitySquareIcon, disabled: true },
        { href: '/stats/trending', title: 'Stats', icon: ActivitySquareIcon },
        { href: '/feedbacks', title: 'Feedbacks', icon: MessageCircleQuestionIcon },
        { href: '/documents', title: 'Documents', icon: FilesIcon },
        { href: '/knowledge-bases', title: 'Knowledge Bases', icon: LibraryBigIcon },
        { href: '/datasources', title: 'Datasources', icon: LibraryIcon },
        { href: '/chat-engines', title: 'Chat Engines', icon: BotMessageSquareIcon },
        { href: '/llms', title: 'LLMs', icon: BrainCircuitIcon },
        { href: '/embedding-models', title: 'Embedding Models', icon: BinaryIcon },
        { href: '/reranker-models', title: 'Reranker Models', icon: ShuffleIcon },
        // { href: '/index-progress', title: 'Index Progress', icon: GaugeIcon },
        // { href: '/knowledge-graph', title: 'Knowledge Graph', icon: WaypointsIcon },
        { href: '/site-settings', title: 'Settings', icon: CogIcon },
      ],
      sectionProps: { className: 'mt-auto mb-0' },
    });
  }

  if (user?.is_superuser) {
    groups.push({
      title: 'Account',
      items: [
        { href: '/api-keys', title: 'API Keys', icon: KeyRoundIcon },
      ],
    });
  }

  return (
    <>
      <SiteNav groups={groups} />
    </>
  );
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
          <SiteNavFooter className="bg-background" />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
