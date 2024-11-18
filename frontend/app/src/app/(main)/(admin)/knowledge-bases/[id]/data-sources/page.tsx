import { cachedGetKnowledgeBaseById } from '@/app/(main)/(admin)/knowledge-bases/[id]/api';
import { KBProvider } from '@/app/(main)/(admin)/knowledge-bases/[id]/context';
import { KnowledgeBaseDatasourceDetails } from '@/components/knowledge-base/datasource-details';

export default async function KnowledgeBaseDataSourcesPage ({ params }: { params: { id: string } }) {
  const id = parseInt(decodeURIComponent(params.id));
  const kb = await cachedGetKnowledgeBaseById(id);

  return (
    <KBProvider value={kb}>
      <section className="space-y-2">
        <h3 className="text-lg font-medium">Data Sources</h3>
        <div className="space-y-8">
          {kb.data_sources.map(datasource => (
            <div className="space-y-4" key={datasource.id}>
              <h4 className="text-lg font-medium">
                {datasource.name}
              </h4>
              <div className="space-y-4 max-w-screen-sm">
                <KnowledgeBaseDatasourceDetails key={datasource.id} id={datasource.id} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </KBProvider>
  );
}