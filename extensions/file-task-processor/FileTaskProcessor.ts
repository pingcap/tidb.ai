import { rag } from '@/core/interface';
import { handleErrors } from '@/lib/fetch';
import mime from 'mime';
import fileTaskProcessorMeta, { type FileTaskProcessorOptions } from './meta';

export default class FileTaskProcessor extends rag.ImportSourceTaskProcessor<FileTaskProcessorOptions> {
  support (taskType: string): boolean {
    return taskType === 'file';
  }

  async process (task: { url: string }): Promise<rag.ImportSourceTaskResult> {
    const response = await fetch(task.url).then(handleErrors);

    return {
      content: {
        buffer: Buffer.from(await response.arrayBuffer()),
        mime: mime.getType(task.url) || 'unknown',
      },
    };
  }
}

Object.assign(FileTaskProcessor, fileTaskProcessorMeta);
