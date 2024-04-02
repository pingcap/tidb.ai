import { type DBv1, getDb } from '@/core/v1/db';
import type { Insertable, Selectable, Updateable } from 'kysely';

export type Chat = Selectable<DBv1['chat']>
export type CreateChat = Insertable<DBv1['chat']>
export type UpdateChat = Updateable<DBv1['chat']>
export type ChatMessage = Selectable<DBv1['chat_message']>
export type CreateChatMessage = Insertable<DBv1['chat_message']>
export type UpdateChatMessage = Updateable<DBv1['chat_message']>

export async function getChat (id: number) {
  return await getDb().selectFrom('chat').selectAll().where('id', '=', id).executeTakeFirst();
}

export async function createChat (create: CreateChat) {
  const { insertId } = await getDb().insertInto('chat').values(create).executeTakeFirstOrThrow();

  return (await getChat(Number(insertId)))!;
}

export async function listChatMessages (chatId: number) {
  return await getDb().selectFrom('chat_message')
    .selectAll()
    .where('chat_id', '=', chatId)
    .orderBy('ordinal asc')
    .execute();
}

export async function getChatMessage (id: number) {
  return await getDb().selectFrom('chat_message').selectAll().where('id', '=', id).executeTakeFirst();
}

export async function createChatMessage (create: CreateChatMessage) {
  const { insertId } = await getDb()
    .insertInto('chat_message')
    .values(create)
    .executeTakeFirstOrThrow();

  return (await getChatMessage(Number(insertId)))!;
}

export async function updateChatMessage (id: number, update: UpdateChatMessage) {
  await getDb()
    .updateTable('chat_message')
    .set(update)
    .where('id', '=', id)
    .execute();
}
