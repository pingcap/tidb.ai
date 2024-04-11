import { tx } from '@/core/v1/db';
import { createDocument, type CreateDocument, getDocumentBySourceUri, updateDocument } from '@/core/v1/document';
import { type CreateDocumentImportTask, createDocumentImportTask, dequeueDocumentImportTasks, type DocumentImportResult, findUnfinishedDocumentImportTaskBySource, finishDocumentImportTask, getDocumentImportTask, startDocumentImportTask, terminateDocumentImportTask } from '@/core/v1/document_import_task';
import { type DocumentImportTask, getSource } from '@/core/v1/source';
import { getErrorMessage } from '@/lib/errors';
import { notFound } from 'next/navigation';

export type DocumentImportTaskProcessor = (task: DocumentImportTask) => Promise<{
  tasks: CreateDocumentImportTask[];
  document?: CreateDocument;
}>

export async function createDocumentImportTaskFromSource (sourceId: number) {
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

export async function createDocumentImportTaskFromDocumentImportTask (taskId: number) {
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

export async function processDocumentImportTasks (n: number, importer: DocumentImportTaskProcessor): Promise<{ succeed: number[], failed: number[] }> {
  const tasks = await dequeueDocumentImportTasks(n);
  const results = await Promise.allSettled(tasks.map(id => executeDocumentImportTask(id, importer)));
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

async function executeDocumentImportTask (id: number, importer: DocumentImportTaskProcessor) {
  const task = await startDocumentImportTask(id);
  if (!task) {
    throw new Error(`failed to run document import task ${id}`);
  }

  try {
    const result = await importer(task);
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
