import { getDb } from '@/core/db';
import { getDocumentIndexTasksSummary } from '@/core/repositories/document_index_task';
import { defineHandler } from '@/lib/next/handler';
import { sql } from 'kysely';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const StatType = z.enum([
  'document_index_state',
  'document_import_tasks',
  'chats',
  'chats_daily',
  'document_index_status_summary',
]);

const paramsSchema = z.object({
  type: StatType,
});

export const GET = defineHandler({
  auth: 'admin',
  params: paramsSchema,
}, async ({ params, request }) => {
  switch (params.type) {
    case StatType.enum.document_import_tasks:
      return await getDocumentImportTasksStats();
    case StatType.enum.document_index_state:
      return await getDocumentIndexStateStats();
    case StatType.enum.chats:
      return await getChatsStats();
    case StatType.enum.chats_daily:
      return await getChatDailyStats();
    case StatType.enum.document_index_status_summary:
      return await getDocumentIndexTasksSummary(parseInt(request.nextUrl.searchParams.get('index_id')!));
    default:
      notFound();
  }
});

async function getDocumentIndexStateStats () {
  const { documents } = await getDb()
    .selectFrom('llamaindex_document_node')
    .select(eb => eb.fn.countAll().as('documents'))
    .executeTakeFirstOrThrow();

  const { chunks } = await getDb()
    .selectFrom('llamaindex_document_chunk_node_default')
    .select(eb => eb.fn.countAll().as('chunks'))
    .executeTakeFirstOrThrow();

  return {
    documents: Number(documents),
    chunks: Number(chunks),
  };
}

async function getDocumentImportTasksStats () {
  const { result } = await getDb()
    .with('cte_agg', qc => qc.selectFrom('document_import_task')
      .select(eb => ([
        eb.fn.countAll().as('amount'),
        'status',
      ]))
      .groupBy('status'))
    .selectFrom('cte_agg')
    .select(eb => eb.fn('json_objectagg', [
      eb.ref('status'),
      eb.ref('amount'),
    ]).as('result'))
    .executeTakeFirstOrThrow();
  return result;
}

async function getChatsStats () {
  return await getDb().selectFrom('chat_message')
    .leftJoin('chat', 'chat.id', 'chat_message.chat_id')
    .select([
      eb => eb.fn.count('chat.id').distinct().as('chats'),
      eb => eb.fn.count('chat_message.id').as('chat_messages'),
      eb => eb.fn.count('chat.created_by').distinct().as('sessions'),
    ])
    .where('role', '=', eb => eb.val('user'))
    .executeTakeFirstOrThrow();
}

async function getChatDailyStats () {
  return await getDb().selectFrom('chat_message')
    .leftJoin('chat', 'chat.id', 'chat_message.chat_id')
    .select([
      eb => eb.fn.count('chat.id').distinct().as('chats'),
      eb => eb.case()
        .when(sql`chat.created_by LIKE '\\$\\$a_%'`).then('anonymous')
        .when(sql`chat.created_by LIKE '%-bot'`).then('bot')
        .when(sql`chat.created_by = 'admin'`).then('admin')
        .else('user')
        .end().as('user_type'),
      eb => eb.fn.count('chat_message.id').as('chat_messages'),
      eb => eb.fn.count('chat.created_by').distinct().as('sessions'),
      eb => eb.fn('DATE', ['chat_message.created_at']).as('date'),
    ])
    .where('role', '=', eb => eb.val('user'))
    .groupBy(['date', eb => eb.case()
      .when(sql`chat.created_by LIKE '\\$\\$a_%'`).then('anonymous')
      .when(sql`chat.created_by LIKE '%-bot'`).then('bot')
      .when(sql`chat.created_by = 'admin'`).then('admin')
      .else('user')
      .end()])
    .orderBy('date desc')
    .limit(28 * 4)
    .execute();
}

export const dynamic = 'force-dynamic';
