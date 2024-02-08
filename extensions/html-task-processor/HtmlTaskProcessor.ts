import { rag } from '@/core/interface';
import { handleErrors } from '@/lib/fetch';
import htmlTaskProcessorMeta from './meta';

export default class HtmlTaskProcessor extends rag.ImportSourceTaskProcessor<{}> {
  support (taskType: string): boolean {
    return taskType === 'html';
  }

  async process (task: { url: string }): Promise<rag.ImportSourceTaskResult> {
    const response = await fetch(task.url).then(handleErrors);

    return {
      content: {
        buffer: Buffer.from(await response.arrayBuffer()),
        mime: 'text/html',
      },
    };
  }
}

Object.assign(HtmlTaskProcessor, htmlTaskProcessorMeta);
