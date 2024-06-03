import {typeOf} from "react-is";
import {ChatEngineProvider} from "../schema/chat_engines";
import {
  CondenseQuestionChatEngineOptions,
} from "@/core/schema/chat_engines/condense_question";
import {type DBv1, getDb, tx} from '@/core/db';
import {executePage, type PageRequest} from '@/lib/database';
import {APIError, CHAT_ENGINE_NOT_FOUND_ERROR} from '@/lib/errors';
import type {Rewrite} from '@/lib/type-utils';
import type {Insertable, Selectable, Updateable} from 'kysely';
import {notFound} from 'next/navigation';

export type ChatEngineRequiredOptions = Required<Pick<ChatEngineOptions, 'llm' | 'retriever' | 'graph_retriever' | 'prompts' >> & Omit<ChatEngineOptions, 'llm' | 'retriever' | 'graph_retriever' | 'prompts'>;
export type ChatEngineOptions = CondenseQuestionChatEngineOptions;
export type ChatEngine = Rewrite<Selectable<DBv1['chat_engine']>, { engine: ChatEngineProvider, engine_options: ChatEngineOptions }>;
export type CreateChatEngine = Rewrite<Insertable<DBv1['chat_engine']>, { engine: ChatEngineProvider, engine_options: ChatEngineOptions }>;
export type UpdateChatEngine = Rewrite<Updateable<DBv1['chat_engine']>, { engine: ChatEngineProvider, engine_options: ChatEngineOptions }>;

export async function getChatEngineById (id: number) {
  return await getDb()
    .selectFrom('chat_engine')
    .selectAll()
    .$castTo<ChatEngine>()
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function getChatEngineByName (name: string) {
  return await getDb()
    .selectFrom('chat_engine')
    .selectAll()
    .$castTo<ChatEngine>()
    .where('name', '=', name)
    .executeTakeFirst();
}

export async function getChatEngineNameByID (id?: number | null) {
  if (!id) return undefined;
  const res = await getDb()
    .selectFrom('chat_engine')
    .select(['name'])
    .where('id', '=', id)
    .executeTakeFirst();
  return res?.name;
}

export async function getDefaultChatEngine () {
  return await getDb()
    .selectFrom('chat_engine')
    .selectAll()
    .$castTo<ChatEngine>()
    .where('is_default', '=', 1)
    .executeTakeFirstOrThrow();
}

export async function getChatEngineByIdOrName (engineIdOrName?: number | string): Promise<ChatEngine> {
  if (typeof engineIdOrName === 'number') {
    const engine = await getChatEngineById(engineIdOrName);
    if (!engine) {
      throw CHAT_ENGINE_NOT_FOUND_ERROR.format(engineIdOrName);
    }
    return engine;
  } else if (typeof engineIdOrName === 'string') {
    const engine = await getChatEngineByName(engineIdOrName);
    if (!engine) {
      throw CHAT_ENGINE_NOT_FOUND_ERROR.format(engineIdOrName);
    }
    return engine;
  } else {
    return await getDefaultChatEngine();
  }
}

export async function listChatEngine (request: PageRequest) {
  return await executePage(getDb()
      .selectFrom('chat_engine')
      .selectAll()
      .where('deleted_at', 'is', null),
    request);
}

export async function createChatEngine (create: CreateChatEngine) {
  const { insertId } = await getDb()
    .insertInto('chat_engine')
    .values({ ...create, engine_options: JSON.stringify(create.engine_options) })
    .executeTakeFirstOrThrow();

  return (await getChatEngineById(Number(insertId)))!;
}

export async function updateChatEngine (id: number, update: UpdateChatEngine) {
  await getDb()
    .updateTable('chat_engine')
    .set({ ...update, engine_options: JSON.stringify(update.engine_options) })
    .where('id', '=', id)
    .execute();
}

export async function deleteChatEngine (id: number) {
  await tx(async () => {
    const chatEngine = await getChatEngineById(id);
    if (!chatEngine) {
      notFound();
    }

    if (chatEngine.is_default) {
      throw APIError.new('cannot delete default chat engine', 400);
    }

    await getDb()
      .deleteFrom('chat_engine')
      .where('id', '=', id)
      .execute();
  });
}
