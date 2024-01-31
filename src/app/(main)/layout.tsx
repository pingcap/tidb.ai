'use client';

import { Nav, NavDrawer } from '@/app/(main)/nav';
import GithubSvg from '@/components/icons/github.svg';
import TwitterXSvg from '@/components/icons/twitter-x.svg';
import { SiteHeader } from '@/components/site-header';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster } from '@/components/ui/sonner';
import { useUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { LogInIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

export default function Layout ({ children }: {
  children: ReactNode
}) {
  return (
    <>
      <div className="md:flex min-h-screen">
        <aside className="pr-0 flex-shrink-0 gap-4 w-80 hidden md:block border-r relative">
          <SiteHeader prefix={<NavDrawer />} />
          <ScrollArea className="h-body p-4 pr-8">
            <Nav />
            <div className="h-header w-full" />
            <div className="h-header w-full" />
          </ScrollArea>
          <NavFooter className="absolute bottom-0 left-0 bg-background" />
        </aside>
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
        <Toaster position="top-right" />
      </div>
    </>
  );
}

function NavFooter ({ className }: { className?: string }) {
  return (
    <div className={cn('w-full', className)}>
      <div className={'h-header p-2 w-full border-t flex gap-0.5 items-center'}>
        <User />
      </div>
      <div className={'h-header p-2 w-full border-t flex gap-0.5 items-center'}>
        <ThemeToggle />
        <Button size="icon" variant="ghost" className="ml-auto rounded-full">
          <GithubSvg />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-full">
          <TwitterXSvg />
        </Button>
      </div>
    </div>
  );
}

function User () {
  const user = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <Button variant="ghost" asChild>
        <Link href="/auth/login" prefetch={false} className="items-center w-full gap-2">
          <LogInIcon size='1em' />
          Login
        </Link>
      </Button>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="border dark:bg-primary bg-primary-foreground p-0.5 w-8 h-8">
            {user.image && <AvatarImage src={user.image} />}
            <AvatarFallback className="text-xs">
              {user.image ? <Skeleton className="w-full h-full" /> : user.name}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent collisionPadding={8} side="top">
          <DropdownMenuItem onClick={() => {
            signOut().finally(() => {
              router.refresh();
            });
          }}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="text-sm font-semibold">
        {user.name}
      </span>
    </div>
  );
}
