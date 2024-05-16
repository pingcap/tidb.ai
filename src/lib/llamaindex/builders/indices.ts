import { getDb, tx } from '@/core/db';
import { getIndex } from '@/core/repositories/index_';
import { buildEmbedding } from '@/lib/llamaindex/builders/embedding';
import { buildLLM } from '@/lib/llamaindex/builders/llm';
import {
  DEFAULT_TIDB_VECTOR_DIMENSIONS,
  TiDBVectorDB,
  TiDBVectorStore
} from '@/lib/llamaindex/storage/vectorStore/TiDBVectorStore';
import { serviceContextFromDefaults, VectorStoreIndex } from 'llamaindex';
import { notFound } from 'next/navigation';

export async function createVectorStoreIndex (id: number) {
  const index = await getIndex(id);
  if (!index) {
    notFound();
  }

  return await VectorStoreIndex.init({
    vectorStore: new TiDBVectorStore({
      dbClient: getDb<TiDBVectorDB>(),
      dbTransaction: (db, scope) => tx(async () => scope(getDb() as never)),
      tableName: `llamaindex_document_chunk_node_${index.name}`,
      dimensions: DEFAULT_TIDB_VECTOR_DIMENSIONS,
    }),
    serviceContext: serviceContextFromDefaults({
      llm: await buildLLM(index.config.llm),
      embedModel: await buildEmbedding(index.config.embedding),
    }),
  });
}
