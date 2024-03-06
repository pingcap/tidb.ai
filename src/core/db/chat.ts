import { db } from '@/core/db/db';
import type { DB } from '@/core/db/schema';
import { executePage, type Page, type PageRequest } from '@/lib/database';
import type { Insertable, Selectable, Updateable } from 'kysely';

export interface ChatDb {
  create (chat: Insertable<DB['chat']>, initialMessages: Insertable<DB['chat_message']>[]): Promise<void>;

  getChat (chatId: string): Promise<Selectable<DB['chat']> | undefined>;

  getHistory (chatId: string): Promise<Selectable<DB['chat_message']>[]>;

  getContext (chatId: string): Promise<{ ordinal: number, title: string, uri: string }[]>;

  addMessages (messages: Insertable<DB['chat_message']>[]): Promise<void>;

  updateMessage (chatMessageId: string, partial: Updateable<DB['chat_message']>): Promise<void>;

  deleteChat (chatId: string, operator: string): Promise<void>;

  listChats (params: PageRequest<{ userId?: string }>): Promise<Page<Selectable<DB['chat']>>>;
}

export const chatDb: ChatDb = {
  async create (chat, initialMessages) {
    await db.transaction().execute(async db => {
      await db.insertInto('chat')
        .values(chat)
        .execute();
      if (initialMessages.length) {
        await db.insertInto('chat_message')
          .values(initialMessages)
          .execute();
      }
    });
  },
  async getChat (id: string) {
    return await db.selectFrom('chat')
      .selectAll()
      .where('id', '=', eb => eb.val(id))
      .executeTakeFirst();
  },
  async listChats (params) {
    let builder = db.selectFrom('chat')
      .selectAll()
      .where('deleted_at', 'is', null)
      .orderBy('created_at', 'desc');

    if (params.userId) {
      builder = builder.where('created_by', '=', eb => eb.val(params.userId));
    }

    return await executePage(builder, params);
  },
  async getHistory (id: string) {
    return await db.selectFrom('chat_message')
      .selectAll()
      .where('chat_id', '=', eb => eb.val(id))
      .orderBy('ordinal asc')
      .execute();
  },
  async getContext (id: string) {
    return await db.selectFrom('chat_message as cm')
      .innerJoin('index_query_result as iqr', 'iqr.index_query_id', 'cm.index_query_id')
      .innerJoin('document_index_chunk as dic', 'iqr.document_index_chunk_id', 'dic.id')
      .innerJoin('document as d', 'dic.document_id', 'd.id')
      .select([
        'cm.ordinal',
        'd.source_uri as uri',
        'd.name as title',
      ])
      .where('cm.chat_id', '=', eb => eb.val(id))
      .orderBy('ordinal asc')
      .orderBy('iqr.score desc')
      .execute();
  },
  async addMessages (messages: Insertable<DB['chat_message']>[]) {
    await db.insertInto('chat_message')
      .values(messages)
      .execute();
  },
  async updateMessage (chatMessageId, partial) {
    await db.updateTable('chat_message')
      .set(partial)
      .where('id', '=', eb => eb.val(chatMessageId))
      .execute();
  },
  async deleteChat (chatId, operator) {
    await db.updateTable('chat')
      .set({
        deleted_at: new Date(),
        deleted_by: operator,
      })
      .where('id', '=', eb => eb.val(chatId))
      .execute();
  },
};