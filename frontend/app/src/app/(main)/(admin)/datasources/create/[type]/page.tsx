'use client';

import { CreateDatasourceForm } from '@/components/datasource/CreateDatasourceForm';
import { isDatasourceType } from '@/components/datasource/types';
import { notFound, useRouter } from 'next/navigation';
import { useTransition } from 'react';

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
