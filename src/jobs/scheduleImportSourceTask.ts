import database from '@/core/db';
import type { DB } from '@/core/db/schema';
import { processImportSourceTask } from '@/jobs/processImportSourceTasks';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import type { Insertable, Selectable } from 'kysely';

export async function scheduleImportSourceTask (source: Selectable<DB['import_source']>) {
  let task: Insertable<DB['import_source_task']>;
  switch (source.type) {
    case 'robots':
      task = {
        type: 'robots',
        url: source.url,
        import_source_id: source.id,
        created_at: new Date(),
        status: 'pending',
      };
      break;
    case 'file':
      task = {
        type: 'file',
        url: source.url,
        import_source_id: source.id,
        created_at: new Date(),
        status: 'pending',
      };
      break;
    default:
      throw new Error(`Does not support import source type ${source.type}`);
  }

  const id = await database.task.enqueue(task);

  if (process.env.AUTO_TRIGGER) {
    void database.task.dequeueById(id)
      .then(async task => {
        if (task) {
          return processImportSourceTask(await getFlow(baseRegistry), task);
        }
      });
  }
}