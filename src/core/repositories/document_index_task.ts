import { DBv1, getDb, tx } from '@/core/db';
import { executePage, type PageRequest } from '@/lib/database';
import type { Rewrite } from '@/lib/type-utils';
import type { Insertable, Selectable, Updateable } from 'kysely';

export type DocumentIndexTask = Rewrite<Selectable<DBv1['document_index_task']>, { 'info': DocumentIndexTaskInfo }>;
export type CreateDocumentIndexTask = Rewrite<Insertable<DBv1['document_index_task']>, { 'info': DocumentIndexTaskInfo }>;
export type UpdateDocumentIndexTask = Rewrite<Updateable<DBv1['document_index_task']>, { 'info': DocumentIndexTaskInfo }>;

export interface DocumentIndexTaskInfo {
  document_node_id?: string;
  document_node_table_name?: string;
  document_chunk_node_table_name?: string;
  chunks_count?: number;
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

// list documents without any index task
export async function listByNotIndexed (indexId: number) {
  const documents = await getDb()
    .with('cte_indexed_documents', cte => cte
      .selectFrom('document_index_task')
      .select('document_id').distinct()
      .where('document_index_task.index_id', '=', indexId),
    )
    .selectFrom('document')
    .select('document.id')
    .where('document.id', 'not in', eb => eb.selectFrom('cte_indexed_documents').select('cte_indexed_documents.document_id'))
    .execute();

  return documents.map(document => document.id);
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

export async function createDocumentIndexTasks (list: CreateDocumentIndexTask[]) {
  await getDb()
    .insertInto('document_index_task')
    .values(list.map(({ info, ...create }) => ({
      ...create,
      info: JSON.stringify(info),
    })))
    .executeTakeFirstOrThrow();
}

export async function listDocumentIndexTasks (page: PageRequest<{ status?: string[] }>) {
  const builder = getDb()
    .selectFrom('document_index_task')
    .selectAll()
    .where(eb => {
      if (page.status?.length) {
        return eb('status', 'in', page.status as any);
      } else {
        return eb.val(true);
      }
    })
    .orderBy('ended_at desc')
    .orderBy('started_at desc')
    .orderBy('created_at desc')
  ;

  return executePage(builder, page);
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

export async function getDocumentIndexTasksSummary (id: number) {
  const { summary } = await getDb()
    .with('cte_status_agg', qc =>
      qc.selectFrom('document_index_task')
        .where('index_id', '=', id)
        .select('status')
        .select(eb => eb.fn.countAll().as('count'))
        .groupBy('status'))
    .selectFrom('cte_status_agg')
    .select(eb => eb.fn<Record<DocumentIndexTask['status'], number>>('json_objectagg', ['status', 'count']).as('summary'))
    .executeTakeFirstOrThrow();

  return summary;
}
