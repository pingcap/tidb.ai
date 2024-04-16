import { tx } from '@/core/db';
import { createDocument, type CreateDocument, getDocumentBySourceUri, updateDocument } from '@/core/repositories/document';
import { type CreateDocumentImportTask, createDocumentImportTask, dequeueDocumentImportTasks, type DocumentImportResult, findUnfinishedDocumentImportTaskBySource, finishDocumentImportTask, getDocumentImportTask, startDocumentImportTask, terminateDocumentImportTask } from '@/core/repositories/document_import_task';
import { type DocumentImportTask, getSource } from '@/core/repositories/source';
import { AppFlowBaseService } from '@/core/services/base';
import { md5 } from '@/lib/digest';
import { getErrorMessage } from '@/lib/errors';
import { genId } from '@/lib/id';
import { select } from 'hast-util-select';
import { toText } from 'hast-util-to-text';
import { notFound } from 'next/navigation';
import path from 'path';
import rehypeParse from 'rehype-parse';
import { unified } from 'unified';

export abstract class DocumentImportService extends AppFlowBaseService {

  static async createTaskFromSource (sourceId: number) {
    return await tx(async () => {
      const source = await getSource(sourceId);
      if (!source) {
        notFound();
      }

      const unfinishedTasks = await findUnfinishedDocumentImportTaskBySource(sourceId);

      if (unfinishedTasks.length > 0) {
        throw new Error(`Failed to create import task: there are ${unfinishedTasks.length} tasks not finished`);
      }

      const task = await createDocumentImportTask({
        status: 'CREATED',
        type: source.type,
        url: source.url,
        source_id: sourceId,
        created_at: new Date(),
      });

      return { source, task };
    });
  }

  static async createTaskFromTask (taskId: number) {
    return await tx(async () => {
      const previousTask = await getDocumentImportTask(taskId);
      if (!previousTask) {
        notFound();
      }

      if (!['FAILED', 'SUCCEED'].includes(previousTask.status)) {
        throw new Error(`Failed to create import task: previous task(#${taskId}) not finished`);
      }

      const task = await createDocumentImportTask({
        status: 'CREATED',
        type: previousTask.type,
        url: previousTask.url,
        source_id: previousTask.source_id,
        parent_task_id: previousTask.parent_task_id,
        created_at: new Date(),
      });

      return { previousTask, task };
    });
  }

  protected abstract process (task: DocumentImportTask): Promise<{ tasks: CreateDocumentImportTask[], document?: CreateDocument }>;

  async runTasks (n: number): Promise<{ succeed: number[], failed: number[] }> {
    const tasks = await dequeueDocumentImportTasks(n);
    const results = await Promise.allSettled(tasks.map(id => this.executeTask(id)));
    const succeed: number[] = [];
    const failed: number[] = [];

    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        succeed.push(tasks[i]);
      } else {
        failed.push(tasks[i]);
      }
    });

    return { succeed, failed };
  }

  private async executeTask (id: number) {
    const task = await startDocumentImportTask(id);
    if (!task) {
      throw new Error(`failed to run document import task ${id}`);
    }

    try {
      const result = await this.process(task);
      let theResult: DocumentImportResult;
      if (result.document) {
        const create = result.document;
        theResult = await tx(async () => {
          const previous = await getDocumentBySourceUri(create.source_uri);
          if (previous) {
            const { last_modified_at, content_uri, hash, name } = create;
            await updateDocument(previous.id, {
              name, hash, content_uri, last_modified_at,
            });
            return {
              tasks: result.tasks,
              document: previous.id,
              isNewDocument: false,
            };
          } else {
            const document = await createDocument(create);
            return {
              tasks: result.tasks,
              document: document.id,
              isNewDocument: true,
            };
          }
        });
      } else {
        theResult = {
          tasks: result.tasks,
          document: undefined,
          isNewDocument: undefined,
        };
      }

      await finishDocumentImportTask(task.id, theResult);
    } catch (e) {
      console.error(`Failed to execute document import task (task id: ${task.id}):`, e);
      await terminateDocumentImportTask(task.id, getErrorMessage(e));
      throw e;
    }
  }
}

export class DefaultDocumentImportService extends DocumentImportService {
  protected async process (task: DocumentImportTask): Promise<{ tasks: CreateDocumentImportTask[]; document?: CreateDocument }> {
    const processor = this.flow.getImportSourceTaskProcessor(task.type, task.url);
    const { enqueue, content } = await processor.process(task);

    let tasks: CreateDocumentImportTask[] = [];
    let document: CreateDocument | undefined;

    if (enqueue) {
      tasks = enqueue.map(info => ({
        ...info,
        status: 'CREATED',
        source_id: task.source_id,
        created_at: new Date(),
      }));
    }

    if (content) {
      const storage = this.flow.getStorage();
      const uri = await storage.put(`raw-documents/${genId()}`, content.buffer);

      let name: string | undefined;

      if (content.mime === 'text/html') {
        const htmlProcessor = unified().use(rehypeParse);
        const root = htmlProcessor.parse(content.buffer);
        const node = select('head > title', root);
        if (node) {
          name = toText(node);
        }
      }

      document = {
        content_uri: uri,
        source_uri: task.url,
        mime: content.mime,
        name: name ?? path.basename(new URL(task.url).pathname),
        created_at: new Date(),
        last_modified_at: new Date(),
        hash: md5(content.buffer),
      };
    }

    return {
      tasks,
      document,
    };
  }
}
