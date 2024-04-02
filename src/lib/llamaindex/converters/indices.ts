import { DBv1, getDb } from '@/core/v1/db';
import { getIndex } from '@/core/v1/index_';
import { getEmbedding } from '@/lib/llamaindex/converters/embedding';
import { getLLM } from '@/lib/llamaindex/converters/llm';
import { DEFAULT_TIDB_VECTOR_DIMENSIONS, type TiDBVectorDB, TiDBVectorStore } from '@/lib/llamaindex/storage/vectorStore/TiDBVectorStore';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { serviceContextFromDefaults, VectorStoreIndex } from 'llamaindex';
import { notFound } from 'next/navigation';

export async function createVectorStoreIndex (id: number) {
  const index = await getIndex(id);
  if (!index) {
    notFound();
  }

  const flow = await getFlow(baseRegistry);

  return await VectorStoreIndex.init({
    vectorStore: new TiDBVectorStore({
      dbClient: getDb<`llamaindex_document_chunk_node_${string}` | 'llamaindex_node_relationship' | 'llamaindex_document_node'>(),
      tableName: `llamaindex_document_chunk_node_${index.name}`,
      dimensions: DEFAULT_TIDB_VECTOR_DIMENSIONS,
    }),
    serviceContext: serviceContextFromDefaults({
      llm: getLLM(flow, index.config.llm.provider, index.config.llm.config),
      embedModel: getEmbedding(flow, index.config.embedding.provider, index.config.embedding.config),
    }),
  });
}

let e: DBv1 = undefined as any;

let c: TiDBVectorDB = e;
console.log(c);