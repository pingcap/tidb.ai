import { cachedGetDatasource } from '@/app/(main)/(admin)/datasources/[id]/api';
import DatasourceDocumentsDocumentsPage from '@/app/(main)/(admin)/datasources/[id]/documents/page.client';
import { AdminPageHeading } from '@/components/admin-page-heading';

export default async function ChatEnginesPage ({ params }: { params: { id: string } }) {
  const datasource = await cachedGetDatasource(parseInt(params.id));

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Datasources', url: '/datasources' },
          { title: datasource.name, url: `/datasources/${datasource.id}` },
          { title: 'Documents' },
        ]}
      />
      <DatasourceDocumentsDocumentsPage datasource={datasource} />
    </>
  );
}
