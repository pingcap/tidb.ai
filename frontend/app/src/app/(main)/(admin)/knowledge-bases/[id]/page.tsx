import { getKnowledgeBaseById } from '@/api/knowledge-base';
import { KBProvider } from '@/app/(main)/(admin)/knowledge-bases/[id]/context';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { DatasourceDetails } from '@/components/datasource/DatasourceDetails';
import { DateFormat } from '@/components/date-format';
import { KnowledgeBaseCard } from '@/components/knowledge-base/knowledge-base-card';
import { KnowledgeBaseIndexProgress } from '@/components/knowledge-base/knowledge-base-index';
import { ModelComponentInfo } from '@/components/model-component-info';
import { NextLink } from '@/components/nextjs/NextLink';
import { OptionDetail } from '@/components/option-detail';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default async function KnowledgeBasePage ({ params }: { params: { id: string } }) {
  const id = parseInt(decodeURIComponent(params.id));
  const kb = await getKnowledgeBaseById(id);

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Knowledge Bases', url: '/knowledge-bases' },
          { title: kb.name },
        ]}
      />
      <KBProvider value={kb}>
        <KnowledgeBaseCard knowledgeBase={kb}>
          <NextLink href={`/knowledge-bases/${kb.id}/documents`} variant="secondary">Documents</NextLink>
        </KnowledgeBaseCard>
        <section className="space-y-2">
          <h3 className="text-lg font-medium">Details</h3>
          <div className="max-w-screen-sm space-y-4">
            <div className="space-y-2 text-sm rounded p-4 border">
              <OptionDetail title="LLM" value={<ModelComponentInfo model={kb.llm} url={llm => `/llms/${llm.id}`} />} />
              <OptionDetail title="Embedding Model" value={<ModelComponentInfo model={kb.embedding_model} url={em => `/embedding-models/${em.id}`} />} />
              <OptionDetail title="Created At" value={<DateFormat date={kb.created_at} />} />
              <OptionDetail title="Updated At" value={<DateFormat date={kb.updated_at} />} />
            </div>
          </div>
        </section>
        <section className="space-y-2">
          <h3 className="text-lg font-medium">Index Progress</h3>
          <KnowledgeBaseIndexProgress id={kb.id} />
        </section>
        <section className="space-y-2">
          <h3 className="text-lg font-medium">Datasources</h3>
          <Accordion type="multiple">
            {kb.data_sources.map(datasource => (
              <AccordionItem key={datasource.id} value={String(datasource.id)}>
                <AccordionTrigger>
                  {datasource.name}
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <DatasourceDetails key={datasource.id} id={datasource.id} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </KBProvider>
    </>
  );
}