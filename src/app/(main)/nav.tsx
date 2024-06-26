'use client';

import { deleteChat } from '@/client/operations/chats';
import { Ask } from '@/components/ask';
import { type NavGroup, SiteNav } from '@/components/site-nav';
import { SiteNavFooter } from '@/components/site-nav-footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogOverlay, DialogPortal } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useAsk } from '@/components/use-ask';
import { useHref } from '@/components/use-href';
import type { Chat } from '@/core/repositories/chat';
import type { Page } from '@/lib/database';
import { fetcher } from '@/lib/fetch';
import { cn } from '@/lib/utils';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActivitySquareIcon, BinaryIcon, BotMessageSquareIcon, CogIcon, CommandIcon, FilesIcon, GlobeIcon, HomeIcon, ImportIcon, MenuIcon, MessageCircleQuestionIcon, MessagesSquareIcon, PlusIcon } from 'lucide-react';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

const conversationItemClassName = 'opacity-80 text-xs p-2 py-1.5 h-max font-light w-[86%] ml-[14%] block whitespace-nowrap overflow-hidden overflow-ellipsis data-[active]:font-semibold';

export function Nav () {
  const href = useHref();
  const [open, setOpen] = useState(false);
  const ask = useAsk(() => {
    setOpen(false);
  });
  const session = useSession();
  const user = session.data?.user;
  const isLoggedIn = user && user.role !== 'anonymous';
  const { data: history, mutate, isLoading } = useSWR(['get', '/api/v1/chats?page_size=8'], fetcher<Page<Chat>>, {
    revalidateOnMount: false,
  });

  useEffect(() => {
    if (user?.id) {
      void mutate();
    } else {
      void mutate(undefined, { revalidate: false });
    }
  }, [user?.id]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey) && !(e.shiftKey)) {
        setOpen(true);
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('keydown', handle);
    return () => {
      window.removeEventListener('keydown', handle);
    };
  }, []);

  const groups = useMemo(() => {
    const disableIfNotAuthenticated = !isLoggedIn ? <><Link className="font-semibold underline" href={`/auth/login?callbackUrl=${encodeURIComponent(href)}`}>Login</Link> to continue</> : false;

    const groups: NavGroup[] = [
      {
        items: [
          { key: 'new', onClick: () => { setOpen(true); }, title: 'New Thread', variant: 'outline', className: 'mb-4 rounded-full cursor-text font-normal text-foreground/70', icon: PlusIcon, details: <span className="flex-shrink-0 flex gap-1 items-center rounded-full"><CommandIcon size="1em" /> K</span> },
          { href: '/', title: 'Home', icon: HomeIcon, exact: true },
          { href: '/c', title: 'Conversations', exact: true, icon: MessagesSquareIcon, disabled: disableIfNotAuthenticated },
          ...(isLoading ? [
            { key: 'placeholder-1', onClick: () => {}, title: <Skeleton className="w-32 h-[1em] rounded" />, variant: 'ghost', disabled: true, className: conversationItemClassName } as const,
            { key: 'placeholder-2', onClick: () => {}, title: <Skeleton className="w-48 h-[1em] rounded" />, variant: 'ghost', disabled: true, className: conversationItemClassName } as const,
            { key: 'placeholder-3', onClick: () => {}, title: <Skeleton className="w-24 h-[1em] rounded" />, variant: 'ghost', disabled: true, className: conversationItemClassName } as const,
          ] : []),
          ...(history?.data.map(chat => (
            {
              href: `/c/${chat.url_key}`,
              title: chat.title,
              variant: (active: boolean) => (active ? 'secondary' : 'ghost'),
              className: conversationItemClassName,
              onDelete: isLoggedIn ? () => {
                deleteChat(chat.id).then(() => mutate(undefined, { revalidate: true }));
              } : undefined,
            }
          )) ?? []),
        ],
      },
    ];

    if (user?.role === 'admin') {
      groups.push({
        title: 'Admin',
        items: [
          { href: '/dashboard', title: 'Overview', icon: ActivitySquareIcon },
          { href: '/feedbacks', title: 'Feedbacks', icon: MessageCircleQuestionIcon },
          { href: '/documents', title: 'Documents', icon: FilesIcon },
          { href: '/indexes', title: 'Indexes', icon: BinaryIcon },
          { href: '/chat-engines', title: 'Chat Engines', icon: BotMessageSquareIcon },
          { href: '/settings', title: 'Settings', icon: CogIcon },
        ],
        sectionProps: { className: 'mt-auto mb-0' },
      });
    }

    return groups;
  }, [isLoggedIn, user?.role, history, href]);

  return (
    <>
      <SiteNav groups={groups} />
      <Dialog open={ask.loading || open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.DialogContent
            className={cn(
              'fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 bg-accent shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
              'p-4',
            )}
          >
            <Ask {...ask} />
          </DialogPrimitive.DialogContent>
        </DialogPortal>
      </Dialog>
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
