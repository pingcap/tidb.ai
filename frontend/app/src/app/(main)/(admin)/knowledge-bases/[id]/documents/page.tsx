import { getDatasource } from '@/api/datasources';
import { getKnowledgeBaseById } from '@/api/knowledge-base';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { DocumentsTable } from '@/components/documents/documents-table';
import { isServerError } from '@/lib/request';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export default async function KnowledgeBaseDocumentsPage ({ params }: { params: { id: string } }) {
  const kb = await getKnowledgeBaseById(parseInt(decodeURIComponent(params.id)));

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Knowledge Base', url: '/knowledge-bases' },
          { title: kb.name, url: `/knowledge-bases/${kb.id}` },
          { title: 'Documents' },
        ]}
      />
      <DocumentsTable knowledgeBaseId={kb.id} />
    </>
  );
}

