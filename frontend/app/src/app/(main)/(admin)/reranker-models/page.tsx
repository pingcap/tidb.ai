import { AdminPageHeading } from '@/components/admin-page-heading';
import RerankerModelsTable from '@/components/reranker/RerankerModelsTable';

export default function Page () {
  return (
    <>
      <AdminPageHeading title="Reranker Models" />
      <RerankerModelsTable />
    </>
  );
}
