import { cachedGetKnowledgeBaseById } from '@/app/(main)/(admin)/knowledge-bases/[id]/api';
import { KBProvider } from '@/app/(main)/(admin)/knowledge-bases/[id]/context';
import { DateFormat } from '@/components/date-format';
import { ModelComponentInfo } from '@/components/model-component-info';
import { OptionDetail } from '@/components/option-detail';

export default async function KnowledgeBaseSettingsPage ({ params }: { params: { id: string } }) {
  const id = parseInt(decodeURIComponent(params.id));
  const kb = await cachedGetKnowledgeBaseById(id);

  return (
    <KBProvider value={kb}>
      <section className="space-y-2">
        <h3 className="text-lg font-medium">Details</h3>
        <div className="max-w-screen-sm space-y-4">
          <div className="space-y-2 text-sm rounded p-4 border">
            <OptionDetail title="Name" value={kb.name} />
            <OptionDetail title="Description" value={kb.description} valueClassName="font-normal text-muted-foreground text-xs" />

            <OptionDetail title="LLM" value={<ModelComponentInfo model={kb.llm} url={llm => `/llms/${llm.id}`} />} />
            <OptionDetail title="Embedding Model" value={<ModelComponentInfo model={kb.embedding_model} url={em => `/embedding-models/${em.id}`} />} />
            <OptionDetail title="Created At" value={<DateFormat date={kb.created_at} />} />
            <OptionDetail title="Updated At" value={<DateFormat date={kb.updated_at} />} />
          </div>
        </div>
      </section>
    </KBProvider>
  );
}