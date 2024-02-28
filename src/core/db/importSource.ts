import { db } from '@/core/db/db';
import type {DB, TaskSummaryItem} from '@/core/db/schema';
import { executePage, type Page, type PageRequest } from '@/lib/database';
import type { Insertable, Selectable } from 'kysely';

export interface ImportSourceDb {
  create (partial: Insertable<DB['import_source']>): Promise<void>;

  find (id: string): Promise<Selectable<DB['import_source']> | undefined>;

  list (): Promise<Selectable<DB['import_source']>[]>;

  listTasks (request: PageRequest<{ status?: string[] }>): Promise<Page<Selectable<DB['import_source_task']>>>;

  calcTaskSummary (sourceIds: string[]): Promise<TaskSummaryItem[]>;
}

export const importSourceDb: ImportSourceDb = {

  async list () {
    return await db.selectFrom('import_source')
      .selectAll()
      .execute();
  },

  async create (partial: Insertable<DB['import_source']>): Promise<void> {
    await db.insertInto('import_source')
      .values(partial)
      .execute();
  },

  async find (id) {
    return db.selectFrom('import_source')
      .selectAll()
      .where('id', '=', eb => eb.val(id))
      .executeTakeFirst();
  },

  async listTasks (request): Promise<Page<Selectable<DB['import_source_task']>>> {
    let builder = db.selectFrom('import_source_task')
      .selectAll()
      .orderBy('finished_at desc');

    if (request.status?.length) {
      builder = builder.where('status', 'in', request.status as any);
    }

    return await executePage(builder, request);
  },

  async calcTaskSummary (sourceIds: string[]): Promise<TaskSummaryItem[]> {
    let builder = db.selectFrom('import_source_task')
      .select(({ fn, val, ref }) => [
        'import_source_id',
        'status',
        fn.count<number>('import_source_task.id').as('tasks'),
      ])
      .where('import_source_id', 'in', sourceIds)
      .groupBy('import_source_id')
      .groupBy('status')

    return builder.execute();
  },

};
