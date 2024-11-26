import { cachedGetKnowledgeBaseById } from '@/app/(main)/(admin)/knowledge-bases/[id]/api';
import { KBProvider } from '@/app/(main)/(admin)/knowledge-bases/[id]/context';
import { GraphEditor } from '@/components/graph/GraphEditor';

export default async function KnowledgeGraphExplorerPage ({ params }: { params: { id: string } }) {
  const id = parseInt(decodeURIComponent(params.id));
  const kb = await cachedGetKnowledgeBaseById(id);

  return (
    <KBProvider value={kb}>
      <section className="space-y-2">
        <GraphEditor knowledgeBaseId={kb.id} />
      </section>
    </KBProvider>
  );
}