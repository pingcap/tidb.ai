'use client';

import { Divider } from '@/components/divider';
import { NextLink } from '@/components/nextjs/NextLink';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button, type ButtonProps } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { ChevronRightIcon, TrashIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { type ComponentType, Fragment, type ReactElement, type ReactNode } from 'react';

export interface NavGroup {
  title?: ReactNode;
  items: NavItem[];
  sectionProps?: {
    className?: string;
  };
}

export interface NavBaseItem {
  icon?: ComponentType<{ className?: string }>;
  title: ReactNode;
  details?: ReactNode;
  className?: string;
  disabled?: ReactNode | boolean;
}

export interface NavLinkItem extends NavBaseItem {
  parent?: undefined;
  custom?: undefined;
  href: string;
  exact?: boolean;
  variant?: ButtonProps['variant'] | ((active: boolean) => ButtonProps['variant']);
  onDelete?: () => void;
  deleteResourceName?: string;
}

export interface NavParentItem extends NavBaseItem {
  parent: true;
  custom?: undefined;
  variant?: ButtonProps['variant'] | ((active: boolean) => ButtonProps['variant']);
  children: (NavLinkItem | CustomItem)[];
}

export interface CustomItem {
  parent?: undefined;
  custom: true;
  key: string;
  children: ReactNode;
}

export type NavItem = NavLinkItem | NavParentItem | CustomItem;

const isCustomItem = (item: NavItem): item is CustomItem => !!item.custom;
const isParentItem = (item: NavItem): item is NavParentItem => !!item.parent;
const isNavLinkItem = (item: NavItem): item is NavLinkItem => 'href' in item && !('children' in item);

export interface SiteNavProps {
  groups: NavGroup[];
}

export function SiteNav ({ groups }: SiteNavProps) {
  const pathname = usePathname() ?? '';

  return (
    <TooltipProvider>
      <nav className="flex flex-col gap-6 px-4 pb-8 pt-0 relative h-full">
        {groups.map((group, index) => (
          <Fragment key={index}>
            <SiteNavGroup group={group} current={pathname} />
          </Fragment>
        ))}
      </nav>
    </TooltipProvider>
  );
}

function SiteNavGroup ({ group, current }: { group: NavGroup, current: string }) {
  const { sectionProps: { className: sectionClassName, ...restSectionProps } = {} } = group;
  return (
    <section className={clsx('space-y-2', sectionClassName)} {...restSectionProps}>
      {group.title && <Divider className="text-sm font-semibold text-foreground/70">{group.title}</Divider>}
      <ul className="space-y-1.5">
        {renderItems(group.items, current)}
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

function isActive (current: string, item: NavLinkItem) {
  return current === item.href || (!item.exact && current.startsWith(item.href));
}

const renderItems = (items: NavItem[], current: string) => {
  return (
    <>
      {items.map(item => (
        isCustomItem(item)
          ? <Fragment key={item.key}>{item.children}</Fragment>
          : isParentItem(item)
            ? <SiteParentItem current={current} active={!!item.children.find(child => isNavLinkItem(child) && isActive(current, child))} item={item} />
            : <SiteNavLinkItem key={item.href} item={item} active={isActive(current, item)} />
      ))}
    </>
  );
};

const renderParentBaseItemContent = (item: NavParentItem) => {
  return (
    <>
      {item.icon && <item.icon className="w-5 h-5 opacity-70 !rotate-0" />}
      {item.title}
      <span className="ml-auto flex items-center gap-1">
        {item.details}
        <ChevronRightIcon className="size-4" />
      </span>
    </>
  );
};

const renderParentItemChildren = (current: string, item: NavParentItem) => {
  return (
    <ul className='space-y-2 p-1 relative'>
      {item.children.map(item => (
        <DropdownMenuItem asChild key={isCustomItem(item) ? item.key : item.href}>
          {isCustomItem(item)
            ? <Fragment key={item.key}>{item.children}</Fragment>
            : <SiteNavLinkItem key={item.href} item={item} active={isActive(current, item)} />}
        </DropdownMenuItem>
      ))}
    </ul>
  );
};

const renderBaseItemContent = (item: NavBaseItem) => {
  return (
    <>
      {item.icon && <item.icon className="w-5 h-5 opacity-70 !rotate-0" />}
      {item.title}
      {item.details && <span className="ml-auto flex items-center">{item.details}</span>}
    </>
  );
};

function SiteParentItem ({ current, item, active }: { current: string, item: NavParentItem, active: boolean }) {
  let el: ReactElement;

  if (!!item.disabled) {
    el = (
      <span className="cursor-not-allowed">
        <Button className={cn('flex w-full justify-start gap-2 font-semibold', item.className)} variant={resolveVariant(item.variant, active) ?? (active ? 'secondary' : 'ghost')} disabled={!!item.disabled}>
          {renderParentBaseItemContent(item)}
        </Button>
      </span>
    );
  } else {
    el = (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={cn('flex w-full justify-start gap-2 font-semibold aria-disabled:opacity-50', item.className)} variant={resolveVariant(item.variant, active) ?? (active ? 'secondary' : 'ghost')} data-active={active ? 'true' : undefined}>
            {renderParentBaseItemContent(item)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" alignOffset={-8}>
          {renderParentItemChildren(current, item)}
        </DropdownMenuContent>
      </DropdownMenu>
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

function SiteNavLinkItem ({ item, active }: { item: NavLinkItem, active: boolean }) {
  let el: ReactElement;

  if (!!item.disabled) {
    el = (
      <span className="cursor-not-allowed">
        <Button className={cn('flex w-full items-center justify-start gap-2 font-semibold', item.className)} variant={resolveVariant(item.variant, active) ?? (active ? 'default' : 'ghost')} disabled={!!item.disabled}>
          {renderBaseItemContent(item)}
        </Button>
      </span>
    );
  } else {
    el = (
      <NextLink href={item.href} prefetch={false} className={cn('flex w-full justify-start items-center gap-2 font-semibold aria-disabled:opacity-50', item.className)} variant={resolveVariant(item.variant, active) ?? (active ? 'default' : 'ghost')} data-active={active ? 'true' : undefined}>
        {renderBaseItemContent(item)}
      </NextLink>
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
  if (item.onDelete) {
    el = (
      <div className="flex gap-2 items-center">
        <div className="flex-1 overflow-hidden text-ellipsis text-nowrap">
          {el}
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="flex-shrink-0 w-max h-max rounded-full p-1 hover:bg-transparent" size="icon" variant="ghost" disabled={!!item.disabled}>
              <TrashIcon className="w-3 h-3 opacity-20 hover:opacity-60" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure to delete {item.deleteResourceName}?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={item.onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
  return (
    <li>
      {el}
    </li>
  );
}
