import { DBv1, getDb, tx } from '@/core/db';
import { executePage, type PageRequest } from '@/lib/database';
import type { Insertable, Selectable, Updateable } from 'kysely';

export type DocumentImportTask = Selectable<DBv1['document_import_task']>;
export type CreateDocumentImportTask = Insertable<DBv1['document_import_task']>;
export type UpdateDocumentImportTask = Updateable<DBv1['document_import_task']>;
export type DocumentImportResult = {
  tasks: CreateDocumentImportTask[]
  document: undefined
  isNewDocument: undefined
} | {
  tasks: CreateDocumentImportTask[]
  document: number
  isNewDocument: boolean
}

export async function getDocumentImportTask (id: number) {
  return getDb().selectFrom('document_import_task')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function listDocumentImportTasks (page: PageRequest<{ status?: string[] }>) {
  const builder = getDb()
    .selectFrom('document_import_task')
    .selectAll()
    .where(eb => {
      if (page.status?.length) {
        return eb('status', 'in', page.status as any);
      } else {
        return eb.val(true);
      }
    })

    .orderBy('finished_at desc')
    .orderBy('created_at desc')
  ;

  return executePage(builder, page);
}

export async function createAndGetDocumentImportTask (create: CreateDocumentImportTask) {
  const { insertId } = await getDb().insertInto('document_import_task')
    .values(create)
    .executeTakeFirstOrThrow();

  return (await getDocumentImportTask(Number(insertId)))!;
}

export async function createDocumentImportTask (create: CreateDocumentImportTask[]) {
  const { insertId } = await getDb().insertInto('document_import_task')
    .values(create)
    .executeTakeFirstOrThrow();
  return Number(insertId);
}

export async function findUnfinishedDocumentImportTaskBySource (sourceId: number) {
  return await getDb()
    .selectFrom('document_import_task')
    .where('source_id', '=', sourceId)
    .where('parent_task_id', 'is', null)
    .where('status', 'not in', ['FAILED', 'SUCCEED'])
    .selectAll()
    .execute();
}

export async function dequeueDocumentImportTasks (n: number) {
  return await tx(async () => {
    const tasks = await getDb()
      .selectFrom('document_import_task')
      .select('id')
      .where('status', '=', 'CREATED')
      .orderBy('created_at asc')
      .limit(n)
      .execute();

    if (tasks.length > 0) {
      await getDb()
        .updateTable('document_import_task')
        .set('status', 'PENDING')
        .where('id', 'in', tasks.map(task => task.id))
        .execute();
    }

    return tasks.map(task => task.id);
  });
}

export async function startDocumentImportTask (id: number) {
  return await tx(async () => {
    const { numUpdatedRows } = await getDb()
      .updateTable('document_import_task')
      .set('status', 'IMPORTING')
      .where('id', '=', id)
      .where('status', 'in', ['PENDING', 'CREATED'])
      .executeTakeFirst();

    if (Number(numUpdatedRows) === 0) {
      return undefined;
    }

    return await getDocumentImportTask(id);
  });
}

export async function finishDocumentImportTask (id: number, result: DocumentImportResult) {
  const { numUpdatedRows } = await getDb()
    .updateTable('document_import_task')
    .set('status', 'SUCCEED')
    .set('finished_at', new Date())
    .set('document_id', result.document ? result.document : null)
    .set('document_operation', result.document != null ? (result.isNewDocument ? 'CREATE' : 'UPDATE') : null)
    .where('id', '=', id)
    .where('status', '=', 'IMPORTING')
    .executeTakeFirst();

  if (Number(numUpdatedRows) === 0) {
    return false;
  }

  if (result.tasks.length > 0) {
    await getDb()
      .insertInto('document_import_task')
      .values(result.tasks)
      .execute();
  }

  return true;
}

export async function terminateDocumentImportTask (id: number, reason: string) {
  const { numUpdatedRows } = await getDb()
    .updateTable('document_import_task')
    .set('status', 'FAILED')
    .set('error_message', reason)
    .set('finished_at', new Date())
    .where('id', '=', id)
    .where('status', 'in', ['IMPORTING', 'PENDING'])
    .executeTakeFirst();

  return Number(numUpdatedRows) !== 0;
}

export async function retryDocumentImportTask (id: number) {
  const { numUpdatedRows } = await getDb()
    .updateTable('document_import_task')
    .set('status', 'CREATED')
    .set('finished_at', null)
    .where('id', '=', id)
    .where('status', 'in', ['SUCCEED', 'FAILED'])
    .executeTakeFirst();

  return Number(numUpdatedRows) !== 0;
}
