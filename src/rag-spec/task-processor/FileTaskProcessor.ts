import type { DB } from '@/core/db/schema';
import type { TaskResult } from '@/core/db/task';
import { rag } from '@/core/interface';
import { handleErrors } from '@/lib/fetch';
import type { Selectable } from 'kysely';
import mime from 'mime';
import { z } from 'zod';

export class FileTaskProcessor extends rag.ImportSourceTaskProcessor<{}> {
  static identifier = 'rag.import-source-task.file';
  static displayName = 'File processor';
  static optionsSchema = z.object({});

  support (taskType: string): boolean {
    return taskType === 'file';
  }

  async process (task: Selectable<DB['import_source_task']>): Promise<TaskResult> {
    const response = await fetch(task.url).then(handleErrors);

    return {
      content: {
        buffer: Buffer.from(await response.arrayBuffer()),
        mime: mime.getType(task.url) || 'unknown',
      },
    };
  }
}
