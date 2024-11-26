import { AdminPageHeading } from '@/components/admin-page-heading';
import RerankerModelsTable from '@/components/reranker/RerankerModelsTable';

export default function Page () {
  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Models' },
          { title: 'Reranker Models', docsUrl: '/docs/reranker-model' },
        ]}
      />
      <RerankerModelsTable />
    </>
  );
}
