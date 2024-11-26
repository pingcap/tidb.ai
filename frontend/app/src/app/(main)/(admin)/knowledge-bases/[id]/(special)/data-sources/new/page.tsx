import { cachedGetKnowledgeBaseById } from '@/app/(main)/(admin)/knowledge-bases/[id]/api';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { CreateDatasourceForm } from '@/components/datasource/create-datasource-form';

export default async function NewKnowledgeBaseDataSourcePage ({ params }: { params: { id: string } }) {
  const id = parseInt(decodeURIComponent(params.id));
  const kb = await cachedGetKnowledgeBaseById(id);

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Knowledge Bases', url: '/knowledge-bases' },
          { title: kb.name, url: `/knowledge-bases/${id}` },
          { title: 'DataSources', url: `/knowledge-bases/${id}/data-sources` },
          { title: 'New' },
        ]}
      />
      <CreateDatasourceForm />
    </>
  );
}
