import {type DBv1, getDb, tx} from '@/core/db';
import type {RetrieveOptions} from '@/core/services/retrieving';
import {executePage, type PageRequest} from '@/lib/database';
import {APIError, CHAT_ENGINE_NOT_FOUND_ERROR} from '@/lib/errors';
import {MetadataFilterConfig} from "@/lib/llamaindex/config/metadata-filter";
import {LLMConfig, LLMConfigSchema} from "@/lib/llamaindex/config/llm";
import {RerankerConfig, RerankerConfigSchema} from "@/lib/llamaindex/config/reranker";
import type {Rewrite} from '@/lib/type-utils';
import type {Insertable, Selectable, Updateable} from 'kysely';
import {notFound} from 'next/navigation';
import {z} from 'zod';

export type ChatEngine = Rewrite<Selectable<DBv1['chat_engine']>, { engine_options: ChatEngineOptions }>;
export type CreateChatEngine = Rewrite<Insertable<DBv1['chat_engine']>, { engine_options: ChatEngineOptions }>;
export type UpdateChatEngine = Rewrite<Updateable<DBv1['chat_engine']>, { engine_options: ChatEngineOptions }>;

export type ChatEngineOptions = CondenseQuestionChatEngineOptions;

export interface CondenseQuestionChatEngineOptions {
  index_id?: number;
  retriever?: Pick<RetrieveOptions, 'search_top_k' | 'top_k'>;
  metadata_filter?: MetadataFilterConfig;
  reranker?: RerankerConfig;
  prompts?: {
    textQa?: string
    refine?: string
    condenseQuestion?: string
  };
  llm?: LLMConfig;
}

export const chatOptionsSchema = z.object({
  index_id: z.coerce.number().int().optional(),
  retriever: z.object({
    search_top_k: z.coerce.number().int().optional(),
    top_k: z.coerce.number().int().optional(),
  }).optional(),
  reranker: RerankerConfigSchema.optional(),
  llm: LLMConfigSchema.optional(),
  prompts: z.object({
    textQa: z.string().optional(),
    refine: z.string().optional(),
    condenseQuestion: z.string().optional(),
  }).optional(),
});

export async function getChatEngine (id: number) {
  return await getDb()
    .selectFrom('chat_engine')
    .selectAll()
    .$castTo<ChatEngine>()
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function getDefaultChatEngine () {
  return await getDb()
    .selectFrom('chat_engine')
    .selectAll()
    .$castTo<ChatEngine>()
    .where('is_default', '=', 1)
    .executeTakeFirstOrThrow();
}

export async function getChatEngineConfig (engineConfigId?: number): Promise<[string, ChatEngineOptions]> {
  if (engineConfigId) {
    const chatEngine = await getChatEngine(engineConfigId);
    if (!chatEngine) {
      throw CHAT_ENGINE_NOT_FOUND_ERROR.format(engineConfigId);
    }
    return [chatEngine.engine, chatEngine.engine_options];
  } else {
    const config = await getDefaultChatEngine();
    return [config.engine, config.engine_options];
  }
}

export async function listChatEngine (request: PageRequest) {
  return await executePage(getDb()
      .selectFrom('chat_engine')
      .selectAll(),
    request);
}

export async function createChatEngine (create: CreateChatEngine) {
  const { insertId } = await getDb()
    .insertInto('chat_engine')
    .values({ ...create, engine_options: JSON.stringify(create.engine_options) })
    .executeTakeFirstOrThrow();

  return (await getChatEngine(Number(insertId)))!;
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
    const chatEngine = await getChatEngine(id);
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
