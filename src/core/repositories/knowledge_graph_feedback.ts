import { type DBv1, getDb } from '@/core/db';
import type { Insertable, Selectable } from 'kysely';

export type KnowledgeGraphFeedback = Selectable<DBv1['knowledge_graph_feedback']>
export type CreateKnowledgeGraphFeedback = Insertable<DBv1['knowledge_graph_feedback']>

export async function createKnowledgeGraphFeedback (create: CreateKnowledgeGraphFeedback) {
  await getDb().insertInto('knowledge_graph_feedback')
    .values(create)
    .execute();
}

export async function findKnowledgeGraphFeedback (langfuseTraceUrl: string, user: string) {
  return await getDb()
    .selectFrom('knowledge_graph_feedback')
    .selectAll()
    .where('trace_url', '=', langfuseTraceUrl)
    .where(eb => {
      if (user) {
        return eb('created_by', '=', user);
      } else {
        return eb.and([]);
      }
    })
    .execute();
}
