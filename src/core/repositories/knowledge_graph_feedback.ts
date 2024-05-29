import { type DBv1, getDb } from '@/core/db';
import { uuidToBin } from '@/lib/kysely';
import type { Overwrite } from '@tanstack/table-core';
import type { Insertable, Selectable } from 'kysely';
import type { UUID } from 'node:crypto';

export type KnowledgeGraphFeedback = Overwrite<Selectable<DBv1['knowledge_graph_feedback']>, { trace_id: UUID, detail: Record<string, 'like' | 'dislike'> }>
export type CreateKnowledgeGraphFeedback = Overwrite<Insertable<DBv1['knowledge_graph_feedback']>, { trace_id: UUID, detail: Record<string, 'like' | 'dislike'> }>

export async function createKnowledgeGraphFeedback (create: CreateKnowledgeGraphFeedback) {
  await getDb().insertInto('knowledge_graph_feedback')
    .values({
      ...create,
      trace_id: uuidToBin(create.trace_id),
      detail: JSON.stringify(create.detail),
    })
    .execute();
}

export async function findKnowledgeGraphFeedback (traceId: UUID, user: string): Promise<KnowledgeGraphFeedback | undefined> {
  return await getDb()
    .selectFrom('knowledge_graph_feedback')
    .select(eb => [
      'id',
      eb.ref('detail').$castTo<Record<string, 'like' | 'dislike'>>().as('detail'),
      eb.fn('bin_to_uuid', ['trace_id']).as('trace_id'),
      'created_at',
      'created_by',
      'comment',
      'report_error',
      'reported_at',
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
