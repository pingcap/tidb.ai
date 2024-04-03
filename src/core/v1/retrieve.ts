import type { RetrieveOptions } from '@/core/services/retrieving';
import { DBv1, getDb, tx } from '@/core/v1/db';
import { executePage, type PageRequest } from '@/lib/database';
import { uuidToBin } from '@/lib/kysely';
import type { Overwrite } from '@tanstack/table-core';
import type { Insertable, Selectable, Updateable } from 'kysely';
import type { UUID } from 'node:crypto';

export type Retrieve = Overwrite<Selectable<DBv1['retrieve']>, { options: RetrieveOptions }>
export type CreateRetrieve = Overwrite<Insertable<DBv1['retrieve']>, { options: RetrieveOptions }>
export type UpdateRetrieve = Overwrite<Updateable<DBv1['retrieve']>, { options?: RetrieveOptions }>
export type RetrieveResult = Overwrite<Selectable<DBv1['retrieve_result']>, { document_chunk_node_id: UUID, document_node_id: UUID }>
export type CreateRetrieveResult = Overwrite<Insertable<DBv1['retrieve_result']>, { document_chunk_node_id: UUID, document_node_id: UUID }>
export type UpdateRetrieveResult = Overwrite<Updateable<DBv1['retrieve_result']>, { document_chunk_node_id: UUID, document_node_id: UUID }>

export async function getRetrieve (id: number) {
  return await getDb()
    .selectFrom('retrieve')
    .selectAll()
    .$castTo<Retrieve>()
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function listRetrieves (pageRequest: PageRequest) {
  return await executePage(getDb()
    .selectFrom('retrieve')
    .selectAll()
    .$castTo<Retrieve>(), pageRequest);
}

export async function getRetrieveResults (retrieveId: number) {
  return await getDb()
    .selectFrom('retrieve_result')
    .selectAll()
    .where('retrieve_id', '=', retrieveId)
    .execute();
}

export async function createRetrieve ({ options, ...create }: CreateRetrieve) {
  const { insertId } = await getDb()
    .insertInto('retrieve')
    .values({
      options: JSON.stringify(options),
      ...create,
    })
    .executeTakeFirstOrThrow();

  return (await getRetrieve(Number(insertId)))!;
}

export async function startRetrieveSearch (id: number) {
  await getDb()
    .updateTable('retrieve')
    .set('status', 'SEARCHING')
    .set('search_started_at', new Date())
    .where('id', '=', id)
    .execute();
}

export async function startRetrieveRerank (id: number) {
  await getDb()
    .updateTable('retrieve')
    .set('status', 'RERANKING')
    .set('search_ended_at', new Date())
    .set('rerank_started_at', new Date())
    .where('id', '=', id)
    .execute();
}

export async function finishRetrieve (id: number, reranked: boolean, results: CreateRetrieveResult[]) {
  await tx(async () => {
    await getDb()
      .updateTable('retrieve')
      .set('status', 'SUCCEED')
      .set(reranked ? 'rerank_ended_at' : 'search_ended_at', new Date())
      .set('finished_at', new Date())
      .where('id', '=', id)
      .execute();

    if (results.length > 0) {
      await getDb()
        .insertInto('retrieve_result')
        .values(results.map(({ document_node_id, document_chunk_node_id, ...rest }) => ({
          document_node_id: uuidToBin(document_node_id),
          document_chunk_node_id: uuidToBin(document_chunk_node_id),
          ...rest,
        })))
        .execute();
    }
  });
}

export async function terminateRetrieve (id: number, reason: string) {
  await getDb()
    .updateTable('retrieve')
    .set('status', 'FAILED')
    .set('error_message', reason)
    .set('finished_at', new Date())
    .where('id', '=', id)
    .execute();
}
