import { rag } from '@/core/interface';
import { handleErrors } from '@/lib/fetch';
import robotsParser from 'robots-parser';
import robotsTaskProcessorMeta, { type RobotsTaskProcessorOptions } from './meta';

export default class RobotsTaskProcessor extends rag.ImportSourceTaskProcessor<RobotsTaskProcessorOptions> {

  support (taskType: string): boolean {
    return taskType === 'robots';
  }

  async process (task: { url: string }): Promise<rag.ImportSourceTaskResult> {
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

Object.assign(RobotsTaskProcessor, robotsTaskProcessorMeta);
