'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { GraphEditor } from '@/components/graph/GraphEditor';

export default function KnowledgeEditorPage () {
  return (
    <>
      <AdminPageHeading title="Knowledge Graph Editor" />
      <GraphEditor />
    </>
  );
}

export const dynamic = 'force-dynamic';
