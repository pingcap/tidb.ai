import { type DBv1, getDb } from '@/core/db';
import { executePage, type PageRequest } from '@/lib/database';
import { uuidToBin } from '@/lib/kysely';
import type { Overwrite } from '@tanstack/table-core';
import type { Insertable, Selectable } from 'kysely';
import type { UUID } from 'node:crypto';

export type Feedback = Overwrite<Selectable<DBv1['feedback']>, { trace_id: UUID, knowledge_graph_detail: Record<string, 'like' | 'dislike'> }>
export type CreateFeedback = Overwrite<Insertable<DBv1['feedback']>, { trace_id: UUID, knowledge_graph_detail: Record<string, 'like' | 'dislike'> }>

export async function createFeedback (create: CreateFeedback) {
  await getDb().insertInto('feedback')
    .values({
      ...create,
      trace_id: uuidToBin(create.trace_id),
      knowledge_graph_detail: JSON.stringify(create.knowledge_graph_detail),
    })
    .execute();
}

export async function findFeedback (traceId: UUID, user: string): Promise<Feedback | undefined> {
  return await getDb()
    .selectFrom('feedback')
    .select(eb => [
      'id',
      eb.fn('bin_to_uuid', ['trace_id']).as('trace_id'),
      'chat_id',
      'message_id',
      'action',
      'created_at',
      'created_by',
      'comment',
      eb.ref('knowledge_graph_detail').$castTo<Record<string, 'like' | 'dislike'>>().as('knowledge_graph_detail'),
      'knowledge_graph_report_error',
      'knowledge_graph_reported_at',
    ])
    .where('trace_id', '=', uuidToBin(traceId))
    .where(eb => {
      if (user) {
        return eb('created_by', '=', user);
      } else {
        return eb.and([]);
      }
    })
    .executeTakeFirst();
}

export async function listFeedbacks (request: PageRequest<{ chat_id?: number, message_id?: number }>) {
  let builder = getDb()
    .selectFrom('feedback')
    .innerJoin('chat', 'chat.id', 'feedback.chat_id')
    .select(eb => [
      'feedback.id',
      eb.fn('bin_to_uuid', ['trace_id']).as('trace_id'),
      'feedback.chat_id',
      eb.ref('chat.url_key').as('chat_key'),
      eb.ref('chat.title').as('chat_title'),
      'message_id',
      'action',
      'feedback.created_at',
      'feedback.created_by',
      'comment',
      eb.ref('knowledge_graph_detail').$castTo<Record<string, 'like' | 'dislike'>>().as('knowledge_graph_detail'),
      'knowledge_graph_report_error',
      'knowledge_graph_reported_at',
    ]);

  if (request.chat_id != null) {
    builder = builder.where('feedback.chat_id', '=', request.chat_id);
  }
  if (request.message_id != null) {
    builder = builder.where('feedback.message_id', '=', request.message_id);
  }

  return await executePage(builder, request);
}
