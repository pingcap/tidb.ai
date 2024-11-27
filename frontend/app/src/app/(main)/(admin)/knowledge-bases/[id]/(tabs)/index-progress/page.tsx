import { KnowledgeBaseIndexProgress } from '@/components/knowledge-base/knowledge-base-index';

export default function KnowledgeBaseIndexProgressPage ({ params }: { params: { id: string } }) {
  const id = parseInt(decodeURIComponent(params.id));

  return (
    <section className="space-y-2">
      <h3 className="text-lg font-medium">Index Progress</h3>
      <KnowledgeBaseIndexProgress id={id} />
    </section>
  );
}