import type { DB } from '@/core/db/schema';
import type { TaskResult } from '@/core/db/task';
import { rag } from '@/core/interface';
import { handleErrors } from '@/lib/fetch';
import type { Selectable } from 'kysely';
import { z } from 'zod';

export class HtmlTaskProcessor extends rag.ImportSourceTaskProcessor<{}> {
  static identifier = 'rag.import-source-task.html';
  static displayName = 'HTML processor';
  static optionsSchema = z.object({});

  support (taskType: string): boolean {
    return taskType === 'html';
  }

  async process (task: { url: string }): Promise<TaskResult> {
    const response = await fetch(task.url).then(handleErrors);

    return {
      content: {
        buffer: Buffer.from(await response.arrayBuffer()),
        mime: 'text/html',
      },
    };
  }
}
