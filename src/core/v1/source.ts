import { type DBv1, getDb } from '@/core/v1/db';
import { executePage, type PageRequest } from '@/lib/database';
import type { Insertable, Selectable, Updateable } from 'kysely';

export type Source = Selectable<DBv1['source']>;
export type CreateSource = Insertable<DBv1['source']>;
export type UpdateSource = Updateable<DBv1['source']>;
export type DocumentImportTask = Selectable<DBv1['document_import_task']>;

export async function getSource (id: number) {
  return await getDb().selectFrom('source')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function listSource (request: PageRequest) {
  return await executePage(
    getDb()
      .with('cte_source_summary', qc => qc
        .selectFrom('document_import_task')
        .select(({ fn }) => [
          'source_id',
          'status',
          fn.count<number>('document_import_task.id').as('tasks'),
        ])
        .groupBy('source_id')
        .groupBy('status'))
      .selectFrom('source')
      .leftJoin('cte_source_summary', 'source.id', 'cte_source_summary.source_id')
      .selectAll('source')
      .select(eb => eb.fn('JSON_OBJECTAGG', ['cte_source_summary.status', 'cte_source_summary.tasks']).as('summary'))
      .groupBy('source.id')
    ,
    request);
}

export async function createSource (create: CreateSource) {
  const { insertId } = await getDb().insertInto('source')
    .values(create)
    .executeTakeFirstOrThrow();

  return (await getSource(Number(insertId)))!;
}

export async function updateSource (id: number, update: UpdateSource) {
  await getDb().updateTable('source')
    .set(update)
    .where('id', '=', id)
    .execute();

  return (await getSource(id))!;
}

// export async function calculateImportTaskSummary () {
//   let builder = getDb().selectFrom('document_import_task')
//     .select(({ fn, val, ref }) => [
//       'import_source_id',
//       'status',
//       fn.count<number>('import_source_task.id').as('tasks'),
//     ])
//     .groupBy('import_source_id')
//     .groupBy('status');
//
//   return builder.execute();
// }