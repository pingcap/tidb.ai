'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { DatasourceTypeTabs } from '@/components/datasource/DatasourceTypeTabs';
import { isDatasourceType } from '@/components/datasource/types';
import { capitalCase } from 'change-case-all';
import { notFound, useRouter, useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';

export default function Layout ({ children }: { children: ReactNode }) {
  const type = useSelectedLayoutSegment()!;
  if (!isDatasourceType(type)) {
    notFound();
  }
  const router = useRouter();

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Datasources', url: '/datasources' },
          { title: `Create ${capitalCase(type)} Datasource` },
        ]}
      />
      <DatasourceTypeTabs type={type} onTypeChange={type => router.push(`/datasources/create/${type}`)} />
      <div className='max-w-screen-sm'>
        {children}
      </div>
    </>
  );
}