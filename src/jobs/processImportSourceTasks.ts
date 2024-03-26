import { Flow } from '@/core';
import database from '@/core/db';
import type { DB } from '@/core/db/schema';
import { saveDocument, updateDocument } from '@/jobs/saveDocument';
import { genId } from '@/lib/id';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import type { Root } from 'hast';
import { select } from 'hast-util-select';
import { toText } from 'hast-util-to-text';
import type { Selectable } from 'kysely';
import { randomUUID, type UUID } from 'node:crypto';
import rehypeParse from 'rehype-parse';
import { unified } from 'unified';

export async function processImportSourceTasks (concurrent: number, maxDuration: number) {
  const start = Date.now();

  let i = 0;

  const flow = await getFlow(baseRegistry);

  let succeed = 0;
  let failed = 0;

  while (Date.now() - start < maxDuration * 0.75 * 1000) {
    const tasks = await database.task.dequeue(concurrent, 'pending');
    if (tasks.length === 0) break;

    await Promise.all(tasks.map(async task => {
      if (await processImportSourceTask(flow, task)) {
        succeed++;
      } else {
        failed++;
      }
    }));

    i += tasks.length;
  }

  return {
    processed: i,
    succeed,
    failed,
  };
}

export async function processImportSourceTask (flow: Flow, task: Selectable<DB['import_source_task']>) {
  try {
    const storage = flow.getStorage();
    const processor = flow.getImportSourceTaskProcessor(task.type, task.url);

    const result = await processor.process(task);

    let documentId: UUID | undefined;

    // if task emit content, save or update to document.
    if (result.content) {
      const document = await database.document.findBySourceUri(task.url);
      let name: string | undefined;

      if (result.content.mime === 'text/html') {
        const htmlProcessor = unified().use(rehypeParse);
        const root = await htmlProcessor.parse(result.content.buffer)
        const node = select('head > title', root);
        if (node) {
          name = toText(node);
        }
      }

      if (document) {
        await updateDocument(storage, document, {
          id: documentId = document.id,
          sourceUrl: task.url,
          mime: result.content.mime,
          buffer: result.content.buffer,
          name,
        });
      } else {
        await saveDocument(storage, {
          id: documentId = randomUUID(),
          sourceUrl: task.url,
          mime: result.content.mime,
          buffer: result.content.buffer,
          name,
        });
      }
    }

    const newIds = await database.task.finish(task, {
      enqueue: result.enqueue,
      documentId,
    });

    if (process.env.AUTO_TRIGGER) {
      if (newIds) {
        void (async (ids: number[]) => {
          console.log('scheduled', ids);
          for (const id of ids) {
            console.log('start', id);
            const task = await database.task.dequeueById(id);
            if (task) {
              await processImportSourceTask(flow, task);
            }
          }
        })(newIds);
      }
    }

    return true;
  } catch (e) {
    await database.task.fail(task, e);
    return false;
  }
}
