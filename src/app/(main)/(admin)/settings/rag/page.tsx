import { RagSettingsForm } from '@/app/(main)/(admin)/settings/rag/form';
import { AdminPageHeading } from '@/components/admin-page-heading';
import db from '@/core/db';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { notFound } from 'next/navigation';

export default async function Page () {
  const flow = await getFlow(baseRegistry);
  const indexConfig = await db.index.findByName('default');

  if (!indexConfig) {
    notFound();
  }

  return (
    <>
      <AdminPageHeading title="RAG Configuration" />
      <RagSettingsForm
        llm={indexConfig.llm}
        embedding={indexConfig.llm}
        reranker="cohere"
        llms={flow.listChatModels()}
        embeddings={flow.listEmbeddings()}
        rerankers={flow.listRerankers()}
      />
    </>
  );
}
