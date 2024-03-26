import { DBv1, getDb, tx } from '@/core/v1/db';
import type { Rewrite } from '@/lib/type-utils';
import type { Insertable, Selectable, Updateable } from 'kysely';

export type DocumentIndexTask = Rewrite<Selectable<DBv1['document_index_task']>, { 'info': DocumentIndexTaskInfo }>;
export type CreateDocumentIndexTask = Rewrite<Insertable<DBv1['document_index_task']>, { 'info': DocumentIndexTaskInfo }>;
export type UpdateDocumentIndexTask = Rewrite<Updateable<DBv1['document_index_task']>, { 'info': DocumentIndexTaskInfo }>;

export interface DocumentIndexTaskInfo {
  document_node_id?: string;
  document_node_table_name?: string;
  document_chunk_node_table_name?: string;
}

export async function getDocumentIndexTask (id: number) {
  return await getDb()
    .selectFrom('document_index_task')
    .selectAll().$castTo<DocumentIndexTask>()
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function listLatestDocumentIndexTasksByDocumentIndex (documentId: number, indexId: number, limit: number) {
  return await getDb()
    .selectFrom('document_index_task')
    .selectAll().$castTo<DocumentIndexTask>()
    .where('index_id', '=', indexId)
    .where('document_id', '=', documentId)
    .orderBy('created_at desc')
    .limit(limit)
    .execute();
}

export async function createDocumentIndexTask ({ info, ...create }: CreateDocumentIndexTask) {
  const { insertId } = await getDb()
    .insertInto('document_index_task')
    .values({
      ...create,
      info: JSON.stringify(info),
    })
    .executeTakeFirstOrThrow();

  return (await getDocumentIndexTask(Number(insertId)))!;
}

export async function updateDocumentIndexTask ({ info, ...update }: UpdateDocumentIndexTask) {
  await getDb()
    .updateTable('document_index_task')
    .set({
      ...update,
      info: JSON.stringify(info),
    })
    .execute();
}

export async function dequeueDocumentIndexTaskById (id: number) {
  return await tx(async () => {
    const tasks = await getDb()
      .selectFrom('document_index_task')
      .select('id')
      .where('status', '=', 'CREATED')
      .where('id', '=', id)
      .orderBy('created_at asc')
      .executeTakeFirst();

    if (tasks) {
      await getDb()
        .updateTable('document_index_task')
        .set('status', 'PENDING')
        .where('id', '=', id)
        .execute();
      return true;
    } else {
      return false;
    }
  });
}

export async function dequeueDocumentIndexTasks (n: number) {
  return await tx(async () => {
    const tasks = await getDb()
      .selectFrom('document_index_task')
      .select('id')
      .where('status', '=', 'CREATED')
      .orderBy('created_at asc')
      .limit(n)
      .execute();

    if (tasks.length > 0) {
      await getDb()
        .updateTable('document_index_task')
        .set('status', 'PENDING')
        .where('id', 'in', tasks.map(t => t.id))
        .execute();
    }

    return tasks.map(task => task.id);
  });
}

export async function startDocumentIndexTask (id: number) {
  return await tx(async () => {
    const { numUpdatedRows } = await getDb().updateTable('document_index_task')
      .set('status', 'INDEXING')
      .set('started_at', new Date())
      .where('id', '=', id)
      .where('status', '=', 'PENDING')
      .executeTakeFirstOrThrow();

    if (Number(numUpdatedRows) === 0) {
      return undefined;
    }

    return (await getDocumentIndexTask(id))!;
  });
}

export async function finishDocumentIndexTask (id: number, info: DocumentIndexTaskInfo) {
  const { numUpdatedRows } = await getDb()
    .updateTable('document_index_task')
    .set('status', 'SUCCEED')
    .set('ended_at', new Date())
    .set('info', JSON.stringify(info))
    .where('id', '=', id)
    .where('status', '=', 'INDEXING')
    .executeTakeFirstOrThrow();

  return Number(numUpdatedRows) !== 0;
}

export async function terminateDocumentIndexTask (id: number, info: DocumentIndexTaskInfo, errorMessage: string) {
  const { numUpdatedRows } = await getDb()
    .updateTable('document_index_task')
    .set('status', 'FAILED')
    .set('ended_at', new Date())
    .set('info', JSON.stringify(info))
    .set('message', errorMessage)
    .where('id', '=', id)
    .where('status', '=', 'INDEXING')
    .executeTakeFirstOrThrow();

  return Number(numUpdatedRows) !== 0;
}
