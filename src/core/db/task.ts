import { db } from '@/core/db/db';
import type { DB } from '@/core/db/schema';
import type { Insertable, Selectable } from 'kysely';

export type TaskStatus = DB['import_source_task']['status'];

export type TaskResult = {
  enqueue?: Array<{ type: string, url: string }>
  content?: {
    buffer: Buffer
    mime: string
  }
}

export type FinishTaskParameters = {
  enqueue?: Array<{ type: string, url: string }>
  documentId?: string
}

export interface TaskDb {
  enqueue (partial: Insertable<DB['import_source_task']>): Promise<void>;

  dequeue (n: number, state?: TaskStatus): Promise<Selectable<DB['import_source_task']>[]>;

  finish (task: Selectable<DB['import_source_task']>, result: FinishTaskParameters): Promise<void>;

  fail (task: Selectable<DB['import_source_task']>, error: unknown): Promise<void>;

  stats (): Promise<{ status: DB['import_source_task']['status'], count: number }[]>;
}

export const taskDb: TaskDb = {
  async enqueue (partial) {
    await db.insertInto('import_source_task')
      .values(partial)
      .execute();
  },

  async dequeue (n: number, status: TaskStatus = 'pending') {
    return await db.transaction().execute(async db => {
      const tasks = await db.selectFrom('import_source_task')
        .selectAll()
        .where('status', '=', eb => eb.val(status))
        .orderBy('created_at asc')
        .limit(n)
        .execute();

      const taskIds = tasks.map(task => task.id);
      if (taskIds.length > 0) {
        await db.updateTable('import_source_task')
          .where('id', 'in', taskIds)
          .set({
            status: 'processing',
          })
          .execute();
      }

      tasks.forEach(task => {
        task.status = 'processing';
      });

      return tasks;
    });
  },

  async finish (task: Selectable<DB['import_source_task']>, result: FinishTaskParameters) {
    const now = new Date();
    await db.transaction().execute(async db => {
      if (result.enqueue?.length) {
        await db.insertInto('import_source_task')
          .values(result.enqueue.map(childTask => ({
            parent_task_id: task.id,
            type: childTask.type,
            url: childTask.url,
            created_at: now,
            document_id: null,
            import_source_id: task.import_source_id,
            finished_at: null,
            status: 'pending',
            error: null,
          })))
          .execute();
      }

      await db.updateTable('import_source_task')
        .where('id', '=', eb => eb.val(task.id))
        .set({
          status: 'succeed',
          finished_at: now,
          document_id: result.documentId,
        })
        .execute();
    });
  },

  async fail (task, error) {
    await db.updateTable('import_source_task')
      .where('id', '=', eb => eb.val(task.id))
      .set({
        finished_at: new Date(),
        status: 'failed',
        error: truncate((error as any)?.message ?? ''),
      })
      .execute();
  },

  async stats () {
    const stats = db.selectFrom('import_source_task')
      .select([
        'status',
        eb => eb.fn.countAll<number>().as('count'),
      ])
      .groupBy('status')
      .execute();

    return stats;
  },
};

function truncate (msg: string) {
  if (msg.length > 10000) {
    return msg.slice(0, 5000) + '\n\n.......\n\n' + msg.slice(msg.length - 5000);
  }
  return msg;
}
