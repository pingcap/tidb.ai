'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { Loader } from '@/components/loader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { type ReactNode, useTransition } from 'react';

export default function SiteSettingsLayout ({ children }: { children: ReactNode }) {
  const segment = useSelectedLayoutSegment() ?? 'website';
  const router = useRouter();
  const [navigating, starTransition] = useTransition();

  return (
    <div className="relative">
      <AdminPageHeading title="Site Settings" />
      <Tabs
        value={segment}
        onValueChange={value => {
          starTransition(() => {
            router.push(`/site-settings${value === 'website' ? '' : `/${value}`}`);
            router.refresh();
          });
        }}
      >
        <TabsList>
          <TabsTrigger disabled={navigating} value="website">Website</TabsTrigger>
          <TabsTrigger disabled={navigating} value="custom_js">JS Widget</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 w-full h-body">
          <Loader loading={navigating} />
        </div>
        {children}
      </div>
    </div>
  );
}
