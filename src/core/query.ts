import database from '@/core/db';
import { vectorToVal } from '@/core/db/db_index';
import { genId } from '@/lib/id';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { z } from 'zod';

export const querySchema = z.object({
  text: z.string(),
  top_k: z.number(),
  source_uri_prefixes: z.string().array().optional(),
});

export async function query (indexName: string, llm: string, { text, top_k, source_uri_prefixes }: z.infer<typeof querySchema>) {
  const embeddings = getFlow(baseRegistry).getEmbeddings(llm);

  const vector = await embeddings.embedQuery(text);

  const id = genId();
  await database.index.startQuery({
    id,
    embedding: vectorToVal(vector) as never,
    text,
    created_at: new Date(),
    index_name: indexName,
  });

  const top = (await database.index._query('default', vector, top_k, { source_uri_prefixes }));

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
