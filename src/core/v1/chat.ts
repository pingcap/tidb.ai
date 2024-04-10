import { type DBv1, getDb } from '@/core/v1/db';
import { executePage, type PageRequest } from '@/lib/database';
import { genId } from '@/lib/id';
import type { Insertable, Selectable, Updateable } from 'kysely';

export type Chat = Selectable<DBv1['chat']>
export type CreateChat = Insertable<Omit<DBv1['chat'], 'url_key'>>
export type UpdateChat = Updateable<Omit<DBv1['chat'], 'url_key'>>
export type ChatMessage = Selectable<DBv1['chat_message']>
export type CreateChatMessage = Insertable<DBv1['chat_message']>
export type UpdateChatMessage = Updateable<DBv1['chat_message']>

export type ChatMessageRetrieveRel = Selectable<DBv1['chat_message_retrieve_rel']>
export type CreateChatMessageRetrieveRel = Insertable<DBv1['chat_message_retrieve_rel']>
export type UpdateChatMessageRetrieveRel = Updateable<DBv1['chat_message_retrieve_rel']>

export async function getChat (id: number) {
  return await getDb().selectFrom('chat').selectAll().where('id', '=', id).executeTakeFirst();
}

export async function getChatByUrlKey (key: string) {
  return await getDb().selectFrom('chat').selectAll().where('url_key', '=', key).executeTakeFirst();
}

export async function deleteChat (id: number, by: string) {
  await getDb()
    .updateTable('chat')
    .set('deleted_by', by)
    .set('deleted_at', new Date())
    .execute();
}

export async function createChat (create: CreateChat) {
  const { insertId } = await getDb()
    .insertInto('chat')
    .values({ url_key: genId(), ...create })
    .executeTakeFirstOrThrow();

  return (await getChat(Number(insertId)))!;
}

export async function listChats (request: PageRequest<{ userId?: string }>) {
  return await executePage(getDb()
    .selectFrom('chat')
    .selectAll()
    .where(eb => {
      if (request.userId) {
        return eb('created_by', '=', request.userId);
      } else {
        return eb.val(true);
      }
    })
    .where('deleted_at', 'is', null)
    .orderBy('created_at desc'), request);
}

export async function listChatMessages (chatId: number) {
  return await getDb()
    .selectFrom('chat_message')
    .selectAll()
    .where('chat_id', '=', chatId)
    .orderBy('ordinal asc')
    .execute();
}

export async function listChatContexts (chatId: number) {
  return await getDb()
    .selectFrom('retrieve_result')
    .innerJoin('chat_message_retrieve_rel', 'chat_message_retrieve_rel.retrieve_id', 'retrieve_result.retrieve_id')
    .innerJoin('chat_message', 'chat_message_retrieve_rel.chat_message_id', 'chat_message.id')
    .innerJoin('document', 'document.id', 'retrieve_result.document_id')
    .select([
      'document.name',
      'document.source_uri',
      'chat_message.ordinal',
    ])
    .where('chat_message.chat_id', '=', chatId)
    .orderBy('retrieve_result.relevance_score desc')
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

export async function createChatMessageRetrieveRel (create: CreateChatMessageRetrieveRel) {
  await getDb()
    .insertInto('chat_message_retrieve_rel')
    .values(create)
    .execute();
}
