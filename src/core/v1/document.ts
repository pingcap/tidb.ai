import { DBv1, getDb } from '@/core/v1/db';
import type { Insertable, Selectable, Updateable } from 'kysely';

export type Document = Selectable<DBv1['document']>;
export type CreateDocument = Insertable<DBv1['document']>;
export type UpdateDocument = Updateable<DBv1['document']>;

export async function getDocument (id: number) {
  return await getDb()
    .selectFrom('document')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function getDocumentBySourceUri (sourceUri: string) {
  return await getDb()
    .selectFrom('document')
    .selectAll()
    .where('source_uri', '=', sourceUri)
    .executeTakeFirst();
}

export async function createDocument (create: CreateDocument) {
  const { insertId } = await getDb()
    .insertInto('document')
    .values(create)
    .executeTakeFirstOrThrow();

  return (await getDocument(Number(insertId)))!;
}

export async function updateDocument (id: number, update: UpdateDocument) {
  await getDb()
    .updateTable('document')
    .set(update)
    .where('id', '=', id)
    .execute()
}
