import { db } from '@/core/db/db';
import type { DB } from '@/core/db/schema';
import type { Insertable, Selectable, Updateable } from 'kysely';

export interface ChatDb {
  create (chat: Insertable<DB['chat']>, initialMessages: Insertable<DB['chat_message']>[]): Promise<void>;

  getHistory (chatId: string): Promise<Selectable<DB['chat_message']>[]>;

  addMessages (messages: Insertable<DB['chat_message']>[]): Promise<void>;

  updateMessage (chatMessageId: string, partial: Updateable<DB['chat_message']>): Promise<void>;
}

export const chatDb: ChatDb = {
  async create (chat, initialMessages) {
    await db.transaction().execute(async db => {
      await db.insertInto('chat')
        .values(chat)
        .execute();
      await db.insertInto('chat_message')
        .values(initialMessages)
        .execute();
    });
  },
  async getHistory (id: string) {
    return await db.selectFrom('chat_message')
      .selectAll()
      .where('chat_id', '=', eb => eb.val(id))
      .orderBy('ordinal asc')
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
};