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
      .selectFrom('source')
      .selectAll(),
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
