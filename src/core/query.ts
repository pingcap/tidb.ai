import database from '@/core/db';
import { genId } from '@/lib/id';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { z } from 'zod';
import {vectorToSql} from "@/lib/kysely";

export const querySchema = z.object({
  text: z.string(),
  top_k: z.number(),
  search_top_k: z.number().optional(),
  namespaces: z.string().array().optional(),
});

export type QueryRequest = z.infer<typeof querySchema>;

export async function query (indexName: string, llm: string, { text, search_top_k, top_k, namespaces = [] }: QueryRequest) {
  const flow = await getFlow(baseRegistry);
  const embeddings = flow.getEmbeddings(llm);
  const reranker = flow.getReranker();
  const vector = await embeddings.embedQuery(text);

  const id = genId();
  await database.index.startQuery({
    id,
    embedding: vectorToSql(vector) as never,
    text,
    created_at: new Date(),
    index_name: indexName,
  });

  // Semantic search for chunks.
  const namespaceIds = await database.namespace.getNamespaceIdsByNames(namespaces);
  const searchedTop = await database.index._query('default', vector, search_top_k ?? top_k * 10, {
    namespaceIds: namespaceIds,
  });

  await database.index.finishQuery(id, searchedTop.map(res => ({
    document_index_chunk_id: res.document_index_chunk_id,
    index_query_id: id,
    score: res.score,
  })));

  // TODO: expand chunk size?

  // TODO: make rerank as optional. If no rerank, return the top k results.

  // Rerank results
  const rerankedResult = await reranker.rerank(text, searchedTop, top_k);

  await database.index.finishRerank(id, { ...rerankedResult.metadata, identifier: reranker.identifier }, rerankedResult.results.map(({ semantic_search_index, relevance_score }) => {
    const res = searchedTop[semantic_search_index];
    return {
      document_index_chunk_id: res.document_index_chunk_id,
      index_query_id: id,
      score: res.score,
      relevance_score,
    }
  }))

  return {
    id,
    top: rerankedResult.results.slice(0, top_k),
  };
}
