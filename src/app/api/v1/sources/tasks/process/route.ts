import database from '@/core/db';
import { md5 } from '@/lib/digest';
import { genId } from '@/lib/id';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import mime from 'mime';
import { type NextRequest, NextResponse } from 'next/server';
import path from 'node:path';

export async function GET (req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const start = Date.now();

  const concurrent = parseInt(req.nextUrl.searchParams.get('concurrent') ?? '10');
  let i = 0;

  const flow = getFlow(baseRegistry);
  const storage = flow.getStorage();

  let succeed = 0;
  let failed = 0;

  while (Date.now() - start < maxDuration * 0.75 * 1000) {
    const tasks = await database.task.dequeue(concurrent, 'pending');
    if (tasks.length === 0) break;

    await Promise.all(tasks.map(async task => {
      try {
        const processor = flow.getImportSourceTaskProcessor(task.type);

        const result = await processor.process(task);

        let documentId: string | undefined;

        // if task emit content, save or update to document.
        if (result.content) {
          const now = new Date();
          const digest = md5(result.content.buffer);
          const document = await database.document.findBySourceUri(task.url);
          if (document) {
            await storage.put(document.content_uri, result.content.buffer);

            // do not update if digest not changed.
            if (digest !== document.digest) {
              await database.document.update(document.id, {
                last_modified_at: now,
                digest,
                mime: result.content.mime,
              });
              documentId = document.id;
            }
          } else {
            const id = documentId = genId();
            const contentPath = toStoragePath(id);
            const contentUri = await storage.put(contentPath, result.content.buffer);
            await database.document.insert([{
              id,
              content_uri: contentUri,
              source_uri: task.url,
              mime: result.content.mime ?? mime.getType(task.url) ?? 'unknown',
              name: path.basename(new URL(task.url).pathname),
              digest,
              created_at: now,
              last_modified_at: now,
            }]);
          }
        }

        await database.task.finish(task, {
          enqueue: result.enqueue,
          documentId,
        });
        succeed++;
      } catch (e) {
        await database.task.fail(task, e);
        failed++;
      }
    }));

    i += tasks.length;
  }

  return NextResponse.json({
    processed_tasks: i,
    succeed,
    failed,
  });
}

const toStoragePath = (id: string) => path.join('blob', id.slice(0, 2), id.slice(2));

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
