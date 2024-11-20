'use client';

import type { KnowledgeGraphEntity } from '@/api/graph';
import { GraphCreateEntity } from '@/components/graph/GraphCreateEntity';
import { NextLink } from '@/components/nextjs/NextLink';
import { useRouter } from 'next/navigation';

export default function CreateSynopsisEntityPage ({ params }: { params: { id: string } }) {
  const kbId = parseInt(decodeURIComponent(params.id));
  const router = useRouter();

  const handleCreateEntity = (entity: KnowledgeGraphEntity) => {
    router.push(`/knowledge-bases/${kbId}/knowledge-graph-explorer?query=entity:${entity.id}`);
  };

  return (
    <>
      <NextLink href='.'>
        Back
      </NextLink>
      <GraphCreateEntity knowledgeBaseId={kbId} onCreated={handleCreateEntity} />
    </>
  );
}