import type { DB } from '@/core/db/schema';
import type { TaskResult } from '@/core/db/task';
import { rag } from '@/core/interface';
import { handleErrors } from '@/lib/fetch';
import type { Selectable } from 'kysely';
import robotsParser from 'robots-parser';
import { z } from 'zod';

export class RobotsTxtTaskProcessor extends rag.ImportSourceTaskProcessor<{}> {
  static identifier = 'rag.import-source-task.robots';
  static displayName = 'Robots.txt processor';
  static optionsSchema = z.object({});

  support (taskType: string): boolean {
    return taskType === 'robots';
  }

  async process (task: Selectable<DB['import_source_task']>): Promise<TaskResult> {
    const response = await fetch(new URL('robots.txt', task.url)).then(handleErrors);
    const text = await response.text();

    const robots = robotsParser(task.url, text);
    const sitemaps = robots.getSitemaps();

    return {
      enqueue: sitemaps.map(sitemap => ({
        type: 'sitemap',
        url: sitemap,
      })),
    };
  }
}
