import database from '@/core/db';
import { genId } from '@/lib/id';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { z } from 'zod';

export const querySchema = z.object({
  text: z.string(),
  top_k: z.number(),
});

export async function query (indexName: string, { text, top_k }: z.infer<typeof querySchema>) {
  const index = await database.index.findByName(indexName);
  if (!index) {
    return undefined;
  }

  const embeddings = getFlow(baseRegistry).getEmbeddings(index.llm);

  const vector = await embeddings.embedQuery(text);

  const id = genId();
  await database.index.startQuery({
    id,
    embedding: JSON.stringify(Array.from(vector)),
    text,
    created_at: new Date(),
    index_name: indexName,
  });

  const top = (await database.index._query('default', vector, top_k));

  await database.index.finishQuery(id, top.map(res => ({
    document_index_chunk_id: res.document_index_chunk_id,
    index_query_id: id,
    score: res.score,
  })));

  return {
    id,
    top,
  };
}
