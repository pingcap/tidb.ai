'use client';

import GithubSvg from '@/components/icons/github.svg';
import TwitterXSvg from '@/components/icons/twitter-x.svg';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, type ButtonProps } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type ComponentType, Fragment, type MouseEvent, type ReactElement, type ReactNode } from 'react';

export interface NavGroup {
  title?: ReactNode;
  items: NavItem[];
}

export interface NavBaseItem {
  icon?: ComponentType<{ className?: string }>;
  title: ReactNode;
  details?: ReactNode;
  className?: string;
  disabled?: ReactNode | boolean;
}

export interface NavLinkItem extends NavBaseItem {
  href: string;
  exact?: boolean;
  variant?: ButtonProps['variant'] | ((active: boolean) => ButtonProps['variant']);
}

export interface NavButtonItem extends NavBaseItem {
  key: string;
  onClick: (ev: MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonProps['variant'];
}

export type NavItem = NavLinkItem | NavButtonItem

const isNavLinkItem = (item: NavBaseItem): item is NavLinkItem => 'href' in item;
const isNavButtonItem = (item: NavBaseItem): item is NavButtonItem => 'onClick' in item;

export interface SiteNavProps {
  groups: NavGroup[];
}

export function SiteNav ({ groups }: SiteNavProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <nav className="space-y-6 px-2 pb-14 relative h-content">
        {groups.map((group, index) => (
          <Fragment key={index}>
            {index > 0 && <Separator orientation="horizontal" />}
            <SiteNavGroup group={group} current={pathname} />
          </Fragment>
        ))}
      </nav>
    </TooltipProvider>
  );
}

function SiteNavGroup ({ group, current }: { group: NavGroup, current: string }) {
  return (
    <section className="space-y-2">
      {group.title && <h6 className="text-sm font-semibold text-foreground/40">{group.title}</h6>}
      <ul className="space-y-1.5">
        {group.items.map(item => (
          isNavLinkItem(item)
            ? <SiteNavLinkItem key={item.href} item={item} active={current === item.href || (!item.exact && current.startsWith(item.href))} />
            : <SiteNavButtonItem key={item.key} item={item} />
        ))}
      </ul>
    </section>
  );
}

function resolveVariant<T extends ButtonProps['variant']> (fnOrValue: T | ((active: boolean) => T | undefined) | null | undefined, active: boolean) {
  if (!fnOrValue) {
    return fnOrValue;
  }
  if (typeof fnOrValue === 'string') {
    return fnOrValue;
  } else {
    return fnOrValue(active);
  }
}

function SiteNavLinkItem ({ item, active }: { item: NavLinkItem, active: boolean }) {
  let el: ReactElement;

  if (!!item.disabled) {
    el = (
      <span className="cursor-not-allowed">
        <Button className={cn('flex w-full justify-start gap-2 font-semibold', item.className)} variant={resolveVariant(item.variant, active) ?? (active ? 'default' : 'ghost')} disabled={!!item.disabled}>
          {item.icon && <item.icon className="w-5 h-5 opacity-70" />}
          {item.title}
          {item.details && <span className="ml-auto">{item.details}</span>}
        </Button>
      </span>
    );
  } else {
    el = (
      <Button asChild className={cn('flex w-full justify-start gap-2 font-semibold', item.className)} variant={resolveVariant(item.variant, active) ?? (active ? 'default' : 'ghost')} data-active={active ? 'true' : undefined}>
        <Link href={item.href} prefetch={false}>
          {item.icon && <item.icon className="w-5 h-5 opacity-70" />}
          {item.title}
          {item.details && <span className="ml-auto">{item.details}</span>}
        </Link>
      </Button>
    );
  }
  if (item.disabled && typeof item.disabled !== 'boolean') {
    el = (
      <Tooltip>
        <TooltipTrigger asChild disabled={!!item.disabled}>
          {el}
        </TooltipTrigger>
        <TooltipContent>
          {item.disabled}
        </TooltipContent>
      </Tooltip>
    );
  }
  return (
    <li>
      {el}
    </li>
  );
}

function SiteNavButtonItem ({ item }: { item: NavButtonItem }) {
  let el: ReactElement;

  if (!!item.disabled) {
    el = (
      <span className="cursor-not-allowed">
        <Button className={cn('flex w-full justify-start gap-2 font-semibold', item.className)} variant={item.variant} disabled={!!item.disabled}>
          {item.icon && <item.icon className="w-5 h-5 opacity-70" />}
          {item.title}
          {item.details && <span className="ml-auto">{item.details}</span>}
        </Button>
      </span>
    );
  } else {
    el = (
      <Button className={cn('flex w-full justify-start gap-2 font-semibold', item.className)} variant={item.variant} onClick={item.onClick}>
        {item.icon && <item.icon className="w-5 h-5 opacity-70" />}
        {item.title}
        {item.details && <span className="ml-auto">{item.details}</span>}
      </Button>
    );
  }

  if (item.disabled && typeof item.disabled !== 'boolean') {
    el = (
      <Tooltip>
        <TooltipTrigger asChild disabled={!!item.disabled}>
          {el}
        </TooltipTrigger>
        <TooltipContent>
          {item.disabled}
        </TooltipContent>
      </Tooltip>
    );
  }
  return (
    <li>
      {el}
    </li>
  );
}