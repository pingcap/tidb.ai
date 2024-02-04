import { db } from '@/core/db/db';
import type { DB } from '@/core/db/schema';
import { rag } from '@/core/interface';
import type { Insertable, Selectable } from 'kysely';

export type TaskStatus = DB['import_source_task']['status'];

export type TaskResult = rag.ImportSourceTaskResult

export type FinishTaskParameters = {
  enqueue?: Array<{ type: string, url: string }>
  documentId?: string
}

export interface TaskDb {
  enqueue (partial: Insertable<DB['import_source_task']>): Promise<number>;

  dequeue (n: number, state?: TaskStatus): Promise<Selectable<DB['import_source_task']>[]>;

  dequeueById (id: number, state?: TaskStatus): Promise<Selectable<DB['import_source_task']> | undefined>;

  finish (task: Selectable<DB['import_source_task']>, result: FinishTaskParameters): Promise<number[]>;

  fail (task: Selectable<DB['import_source_task']>, error: unknown): Promise<void>;

  stats (): Promise<Record<DB['import_source_task']['status'], number>>;

  retry (ids: number[]): Promise<number>;
}

export const taskDb: TaskDb = {
  async enqueue (partial) {
    const { insertId } = await db.insertInto('import_source_task')
      .values(partial)
      .executeTakeFirstOrThrow();

    return Number(insertId);
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

  async dequeueById (id: number, status: TaskStatus = 'pending') {
    return await db.transaction().execute(async db => {
      const task = await db.selectFrom('import_source_task')
        .selectAll()
        .where('id', '=', eb => eb.val(id))
        .where('status', '=', eb => eb.val(status))
        .orderBy('created_at asc')
        .executeTakeFirst();

      if (task) {
        await db.updateTable('import_source_task')
          .where('id', '=', eb => eb.val(id))
          .set({
            status: 'processing',
          })
          .execute();
      }

      return task;
    });
  },

  async finish (task: Selectable<DB['import_source_task']>, result: FinishTaskParameters) {
    const now = new Date();
    return await db.transaction().execute(async db => {
      let newIds: number[] = [];
      if (result.enqueue?.length) {
        const { numInsertedOrUpdatedRows } = await db.insertInto('import_source_task')
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
          .executeTakeFirst();
        const { id: insertId } = await db.selectFrom('import_source_task')
          .select(eb => eb.fn.max('id').as('id'))
          .executeTakeFirstOrThrow();
        for (let i = Number(insertId) - Number(numInsertedOrUpdatedRows) + 1; i <= Number(insertId); i++) {
          newIds.push(i);
        }
      }

      await db.updateTable('import_source_task')
        .where('id', '=', eb => eb.val(task.id))
        .set({
          status: 'succeed',
          finished_at: now,
          document_id: result.documentId,
        })
        .execute();

      return newIds;
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
    const stats = await db.selectFrom('import_source_task')
      .select([
        'status',
        eb => eb.fn.countAll<number>().as('count'),
      ])
      .groupBy('status')
      .execute();

    return stats.reduce((res, item) => {
      res[item.status] = item.count;
      return res;
    }, {} as Record<DB['import_source_task']['status'], number>);
  },

  async retry (ids: number[]) {
    const { numUpdatedRows } = await db.updateTable('import_source_task')
      .set({
        status: 'pending',
      })
      .where('status', 'not in', ['processing', 'pending'])
      .where('id', 'in', ids)
      .executeTakeFirstOrThrow();

    return Number(numUpdatedRows);
  },
};

function truncate (msg: string) {
  if (msg.length > 10000) {
    return msg.slice(0, 5000) + '\n\n.......\n\n' + msg.slice(msg.length - 5000);
  }
  return msg;
}
