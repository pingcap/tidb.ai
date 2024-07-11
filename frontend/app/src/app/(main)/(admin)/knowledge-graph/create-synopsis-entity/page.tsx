'use client';

import type { KnowledgeGraphEntity } from '@/api/graph';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { GraphCreateEntity } from '@/components/graph/GraphCreateEntity';
import { useRouter } from 'next/navigation';

export default function CreateSynopsisEntityPage () {

  const router = useRouter();

  const handleCreateEntity = (entity: KnowledgeGraphEntity) => {
    router.push(`/knowledge-graph?query=entity:${entity.id}`);
  };

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          {
            title: 'Knowledge Graph Editor',
            url: '/knowledge-graph',
          },
          {
            title: 'Create synopsis entity',
          },
        ]}
      />
      <GraphCreateEntity onCreated={handleCreateEntity} />
    </>
  );
}