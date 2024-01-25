'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ComponentType, type ReactNode } from 'react';

export interface NavGroup {
  title?: ReactNode;
  items: NavItem[];
}

export interface NavItem {
  href: string;
  icon?: ComponentType<{ className?: string }>;
  title: ReactNode;
  details?: ReactNode;
  exact?: boolean;
}

export interface SiteNavProps {
  groups: NavGroup[];
}

export function SiteNav ({ groups }: SiteNavProps) {
  const pathname = usePathname();
  return (
    <nav className="space-y-6 px-2">
      {groups.map((group, index) => (
        <SiteNavGroup key={index} group={group} current={pathname} />
      ))}
    </nav>
  );
}

function SiteNavGroup ({ group, current }: { group: NavGroup, current: string }) {
  return (
    <section className="space-y-2">
      {group.title && <h6 className="text-sm font-semibold text-foreground/40">{group.title}</h6>}
      <ul className="space-y-1.5">
        {group.items.map(item => (
          <SiteNavItem key={item.href} item={item} active={current === item.href || (!item.exact && current.startsWith(item.href))} />
        ))}
      </ul>
    </section>
  );
}

function SiteNavItem ({ item, active }: { item: NavItem, active: boolean }) {
  return (
    <li>
      <Button asChild className={cn('flex w-full justify-start gap-2 font-semibold')} variant={active ? 'default' : 'ghost'}>
        <Link href={item.href} prefetch={false}>
          {item.icon && <item.icon className="w-5 h-5 opacity-70" />}
          {item.title}
          <span className="ml-auto">{item.details}</span>
        </Link>
      </Button>
    </li>
  );
}