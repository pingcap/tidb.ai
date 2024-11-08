import { getKnowledgeBaseById, getKnowledgeBaseDocumentChunks } from '@/api/knowledge-base';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { DocumentChunksTable } from '@/components/knowledge-base/document-chunks-table';

export default async function KnowledgeBaseDocumentsPage ({ params }: { params: { id: string, documentId: string } }) {
  const id = parseInt(decodeURIComponent(params.id));
  const documentId = parseInt(decodeURIComponent(params.documentId));
  const [kb, chunks] = await Promise.all([
    getKnowledgeBaseById(id),
    getKnowledgeBaseDocumentChunks(id, documentId),
  ]);

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Knowledge Base', url: '/knowledge-bases' },
          { title: kb.name, url: `/knowledge-bases/${kb.id}` },
          { title: 'Documents', url: `/knowledge-bases/${kb.id}/documents` },
          { title: params.documentId },
          { title: 'Chunks' },
        ]}
      />
      <DocumentChunksTable data={chunks} />
    </>
  );
}

