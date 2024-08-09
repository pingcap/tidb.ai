'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { Loader } from '@/components/loader';
import { usePush } from '@/components/nextjs/app-router-hooks';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSelectedLayoutSegment } from 'next/navigation';
import { type ReactNode } from 'react';

export default function SiteSettingsLayout ({ children }: { children: ReactNode }) {
  const segment = useSelectedLayoutSegment() ?? 'website';
  const [navigating, push] = usePush(true);

  return (
    <div className="relative">
      <AdminPageHeading title="Site Settings" />
      <Tabs
        value={segment}
        onValueChange={value => {
          push(`/site-settings${value === 'website' ? '' : `/${value}`}`);
        }}
      >
        <TabsList>
          <TabsTrigger disabled={navigating} value="website">Website</TabsTrigger>
          <TabsTrigger disabled={navigating} value="integrations">Integrations</TabsTrigger>
          <TabsTrigger disabled={navigating} value="custom_js">JS Widget</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="relative mt-4">
        <div className="pointer-events-none absolute left-0 top-0 w-full h-body">
          <Loader loading={navigating} />
        </div>
        {children}
      </div>
    </div>
  );
}
