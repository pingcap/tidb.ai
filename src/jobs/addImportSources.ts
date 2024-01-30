import database from '@/core/db';
import { scheduleImportSourceTask } from '@/jobs/scheduleImportSourceTask';
import { genId } from '@/lib/id';

export async function addImportSources (uris: string[]) {
  await Promise.all(uris.map(async uri => {
    const url = new URL(uri);
    const id = genId();
    let type: string;
    if (url.pathname === '' || url.pathname === '/') {
      type = 'robots';
    } else {
      type = 'file';
    }

    const source = {
      id,
      type,
      created_at: new Date(),
      url: url.toString(),
      filter: null,
      filter_runtime: null,
    } as const;

    await database.importSource.create(source);

    if (process.env.AUTO_TRIGGER) {
      void scheduleImportSourceTask(source);
    }
  }))
}