import { DBv1, tx } from '@/core/v1/db';
import { type Document, getDocument } from '@/core/v1/document';
import { createDocumentIndexTask, createDocumentIndexTasks, dequeueDocumentIndexTaskById, dequeueDocumentIndexTasks, type DocumentIndexTask, type DocumentIndexTaskInfo, finishDocumentIndexTask, listByNotIndexed, listLatestDocumentIndexTasksByDocumentIndex, startDocumentIndexTask, terminateDocumentIndexTask } from '@/core/v1/document_index_task';
import { getIndex, type Index } from '@/core/v1/index_';
import { getErrorMessage } from '@/lib/errors';
import { notFound } from 'next/navigation';

export const DEFAULT_INDEX_NAME = 'default';

export type DocumentIndexTaskProcessor = (task: DocumentIndexTask, document: Document, index: Index, mutableInfo: DocumentIndexTaskInfo) => Promise<DocumentIndexTaskResult>

export type DocumentIndexTaskResult = {
  documentNodeTableName: keyof DBv1
  documentChunkNodeTableName: keyof DBv1
  documentNode: string;
  isNewDocumentNode: boolean;
}

export async function createNewDocumentIndexTask (documentId: number, indexId: number) {
  const document = await getDocument(documentId);
  const index = await getIndex(indexId);

  if (!document || !index) {
    notFound();
  }

  const recentTasks = await listLatestDocumentIndexTasksByDocumentIndex(documentId, indexId, 1);
  if (recentTasks.length === 0) {
    return await createDocumentIndexTask({
      index_id: indexId,
      document_id: documentId,
      created_at: new Date(),
      type: 'CREATE_INDEX',
      status: 'CREATED',
      info: {},
    });
  }
  const task = recentTasks[0];
  if (!['SUCCEED', 'FAILED'].includes(task.status)) {
    throw new Error(`not finished document index task #${task.id} already exists`);
  }

  return await createDocumentIndexTask({
    index_id: indexId,
    document_id: documentId,
    created_at: new Date(),
    type: 'REINDEX',
    status: 'CREATED',
    info: {},
  });
}

// TODO: a new function to schedule documents with only error index tasks
export async function scheduleDocumentFirstIndex (indexId: number) {
  return await tx(async () => {
    const ids = await listByNotIndexed(indexId);
    if (ids.length === 0) {
      return [];
    }

    await createDocumentIndexTasks(ids.map(id => ({
      document_id: id,
      type: 'CREATE_INDEX',
      info: {},
      index_id: indexId,
      created_at: new Date(),
      status: 'CREATED',
    })));

    return ids;
  });
}

/**
 * Process a single document index task.
 * @param id
 * @param processor
 */
export async function processDocumentIndexTask (id: number, processor: DocumentIndexTaskProcessor) {
  if (!await dequeueDocumentIndexTaskById(id)) {
    throw new Error(`cannot dequeue document index task #${id}`);
  }

  await executeDocumentIndexTask(id, processor);
}

/**
 * Process multiple document index tasks.
 * @param n
 * @param processor
 */
export async function processDocumentIndexTasks (n: number, processor: DocumentIndexTaskProcessor) {
  const tasks = await dequeueDocumentIndexTasks(n);
  const results = await Promise.allSettled(tasks.map(id => executeDocumentIndexTask(id, processor)));

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

async function executeDocumentIndexTask (id: number, processor: DocumentIndexTaskProcessor) {
  const task = await startDocumentIndexTask(id);
  if (!task) {
    throw new Error(`cannot start document index task #${id}`);
  }
  let info: DocumentIndexTaskInfo = {};

  try {
    info = { ...task.info };
    const document = (await getDocument(task.document_id))!;
    const index = (await getIndex(task.index_id))!;

    const result = await processor(task, document, index, info);

    info.document_node_id = result.documentNode;
    info.document_node_table_name = result.documentNodeTableName;
    info.document_chunk_node_table_name = result.documentChunkNodeTableName;

    await finishDocumentIndexTask(id, info);
  } catch (e) {
    console.error(e);
    await terminateDocumentIndexTask(id, info, getErrorMessage(e));
    throw e;
  }
}
