'use client';

import { Divider } from '@/components/divider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

export interface NavParentItem extends NavBaseItem {
  key: string;
  href?: string;
  variant?: ButtonProps['variant'] | ((active: boolean) => ButtonProps['variant']);
  children: Array<NavLinkItem | NavButtonItem>;
}

export type NavItem = NavLinkItem | NavButtonItem | NavParentItem

const isNavLinkItem = (item: NavBaseItem): item is NavLinkItem => 'href' in item && !('children' in item);
const isNavButtonItem = (item: NavBaseItem): item is NavButtonItem => 'onClick' in item;

export interface SiteNavProps {
  groups: NavGroup[];
}

export function SiteNav ({ groups }: SiteNavProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <nav className="space-y-6 p-4 relative">
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
  return (
    <section className="space-y-2">
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

const renderItems = (items: NavItem[], current: string) => {
  return (
    <>
      {items.map(item => (
        isNavLinkItem(item)
          ? <SiteNavLinkItem key={item.href} item={item} active={current === item.href || (!item.exact && current.startsWith(item.href))} />
          : isNavButtonItem(item)
            ? <SiteNavButtonItem key={item.key} item={item} />
            : <SiteNavParentItem key={item.key} item={item} current={current} active={!!item.href && current.startsWith(item.href)} />
      ))}
    </>
  );
};

const renderBaseItemContent = (item: NavBaseItem) => {
  return (
    <>
      {item.icon && <item.icon className="w-5 h-5 opacity-70 !rotate-0" />}
      {item.title}
      {item.details && <span className="ml-auto">{item.details}</span>}
    </>
  );
};

function SiteNavLinkItem ({ item, active }: { item: NavLinkItem, active: boolean }) {
  let el: ReactElement;

  if (!!item.disabled) {
    el = (
      <span className="cursor-not-allowed">
        <Button className={cn('flex w-full justify-start gap-2 font-semibold', item.className)} variant={resolveVariant(item.variant, active) ?? (active ? 'default' : 'ghost')} disabled={!!item.disabled}>
          {renderBaseItemContent(item)}
        </Button>
      </span>
    );
  } else {
    el = (
      <Button asChild className={cn('flex w-full justify-start gap-2 font-semibold', item.className)} variant={resolveVariant(item.variant, active) ?? (active ? 'default' : 'ghost')} data-active={active ? 'true' : undefined}>
        <Link href={item.href} prefetch={false}>
          {renderBaseItemContent(item)}
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
          {renderBaseItemContent(item)}
        </Button>
      </span>
    );
  } else {
    el = (
      <Button className={cn('flex w-full justify-start gap-2 font-semibold', item.className)} variant={item.variant} onClick={item.onClick}>
        {renderBaseItemContent(item)}
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

function SiteNavParentItem ({ item, current, active }: { item: NavParentItem, current: string, active: boolean }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={item.key} className="border-b-0">
        <Button className={cn('flex justify-start gap-2 font-semibold hover:no-underline', item.className)} variant={resolveVariant(item.variant, active) ?? (active ? 'secondary' : 'ghost')} data-active={active ? 'true' : undefined} asChild>
          <AccordionTrigger>
            {renderBaseItemContent(item)}
            <span className='flex-1' />
          </AccordionTrigger>
        </Button>
        <AccordionContent>
          <ul className="space-y-1.5 p-2">
            {renderItems(item.children, current)}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}