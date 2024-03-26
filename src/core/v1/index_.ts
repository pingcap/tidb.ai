import { DBv1, getDb } from '@/core/v1/db';
import type { Selectable } from 'kysely';

export type Index = Selectable<DBv1['index']>;

export async function getIndex (id: number) {
  return await getDb()
    .selectFrom('index')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function getIndexByName (name: string) {
  return await getDb()
    .selectFrom('index')
    .selectAll()
    .where('name', '=', eb => eb.val(name))
    .executeTakeFirst();
}
