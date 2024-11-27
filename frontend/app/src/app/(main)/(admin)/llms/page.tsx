import { AdminPageHeading } from '@/components/admin-page-heading';
import { LLMsTable } from '@/components/llm/LLMsTable';

export default function Page () {
  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Models' },
          { title: 'LLMs', docsUrl: '/docs/llm' },
        ]}
      />
      <LLMsTable />
    </>
  );
}
