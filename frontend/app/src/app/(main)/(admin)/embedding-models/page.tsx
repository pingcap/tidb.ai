'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { EmbeddingModelsTable } from '@/components/embedding-models/EmbeddingModelsTable';

export default function EmbeddingModelPage () {

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Models' },
          { title: 'Embedding Models', docsUrl: '/docs/embedding-model' },
        ]}
      />
      <EmbeddingModelsTable />
    </>
  );
}
