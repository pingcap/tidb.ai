'use client';

import { CreateDatasourceForm } from '@/components/datasource/CreateDatasourceForm';
import { isDatasourceType } from '@/components/datasource/types';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTransition } from 'react';

const allowedTypes = ['file', 'web-sitemap', 'web-single-page'];

export default function CreateDatasourcePage ({ params }: { params: { type: string } }) {
  const [transitioning, startTransition] = useTransition();
  const router = useRouter();

  if (!isDatasourceType(params.type)) {
    notFound();
  }

  return (
    <CreateDatasourceForm
      type={params.type}
      transitioning={transitioning}
      onCreated={datasource => {
        startTransition(() => {
          router.push(`/datasources/${datasource.id}`);
        });
      }}
    />
  );
}
