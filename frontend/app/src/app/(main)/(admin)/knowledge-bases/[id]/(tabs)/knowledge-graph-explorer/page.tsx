import { GraphEditor } from '@/components/graph/GraphEditor';

export default function KnowledgeGraphExplorerPage ({ params }: { params: { id: string } }) {
  const id = parseInt(decodeURIComponent(params.id));

  return (
    <section className="space-y-2">
      <GraphEditor knowledgeBaseId={id} />
    </section>
  );
}