'use client';

import { Button } from '@/components/ui/button';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

export function SettingsNavigation (props: {
  tabs: { id: string; name: string; href: string, exact?: boolean }[];
}) {
  const { tabs } = props;
  const pathname = usePathname();

  return (
    <ul className="flex lg:flex-col gap-1.5 lg:w-[200px]">
      {tabs.map((tab) => (
        <NextLink key={tab.id} href={tab.href}>
          <Button
            className="w-full justify-start"
            variant={(tab.exact ? pathname === tab.href : pathname.startsWith(tab.href)) ? 'default' : 'ghost'}
          >
            {tab.name}
          </Button>
        </NextLink>
      ))}
    </ul>
  );
}
