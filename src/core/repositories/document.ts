import { DBv1, getDb } from '@/core/db';
import { executePage, type PageRequest } from '@/lib/database';
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

export async function getDocuments (iterableIdList: Iterable<number>) {
  const idList = Array.from(iterableIdList);
  if (idList.length === 0) {
    return [];
  }
  return await getDb()
    .selectFrom('document')
    .selectAll()
    .where('id', 'in', idList)
    .execute();
}

export async function getDocumentBySourceUri (sourceUri: string) {
  return await getDb()
    .selectFrom('document')
    .selectAll()
    .where('source_uri', '=', sourceUri)
    .executeTakeFirst();
}

export async function getDocumentsBySourceUris (sourceUris: string[]) {
  return await getDb()
    .selectFrom('document')
    .selectAll()
    .where('source_uri', 'in', sourceUris)
    .execute();
}

export async function listDocuments (request: PageRequest<{ q: string[] }>) {
  let q = request.q?.[0] ?? undefined;
  const escapedQ = q ? q
      .replaceAll('%', '\\%')
      .replaceAll('_', '\\_')
      .replaceAll('\\', '\\\\')
    : undefined;

  return await executePage(getDb()
      .selectFrom('document')
      .selectAll()
      .where(eb => {
        if (escapedQ) {
          return eb.or([
            eb('name', 'like', eb.val(`%${escapedQ}%`)),
            eb('source_uri', 'like', eb.val(`%${escapedQ}%`)),
          ]);
        } else {
          return eb.and([]);
        }
      })
    , request);
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
    .execute();
}
