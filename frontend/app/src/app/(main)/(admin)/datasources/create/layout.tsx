'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { capitalCase } from 'change-case-all';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';

export default function Layout ({ children }: { children: ReactNode }) {
  const type = useSelectedLayoutSegment()!;
  const router = useRouter();

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Datasources', url: '/datasources' },
          { title: `Create ${capitalCase(type)} Datasource` },
        ]}
      />
      <Tabs value={type} onValueChange={value => router.push(`/datasources/create/${value}`)}>
        <TabsList>
          <TabsTrigger value="file">
            File
          </TabsTrigger>
          <TabsTrigger value="web-sitemap" disabled>
            Web Sitemap
          </TabsTrigger>
          <TabsTrigger value="web-signlepage" disabled>
            Web Single Page
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {children}
    </>
  );
}