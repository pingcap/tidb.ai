import { type DBv1, getDb } from '@/core/db';
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
