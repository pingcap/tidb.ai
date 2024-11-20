'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { usePush } from '@/components/nextjs/app-router-hooks';
import { CreateRerankerForm } from '@/components/reranker/CreateRerankerForm';

export default function Page () {
  const [navigating, push] = usePush();

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Models' },
          { title: 'Reranker Models', url: '/reranker-models' },
          { title: 'Create' },
        ]}
      />
      <CreateRerankerForm
        transitioning={navigating}
        onCreated={reranker => {
          push(`/reranker-models/${reranker.id}`);
        }}
      />
    </>
  );
}