import database from '@/core/db';
import { processImportSourceTask } from '@/jobs/processImportSourceTasks';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST (req: NextRequest) {
  const { ids } = z.object({
    ids: z.number().int().array(),
  }).parse(await req.json());

  const updated = await database.task.retry(ids);

  if (process.env.AUTO_TRIGGER) {
    void (async () => {
      const flow = await getFlow(baseRegistry);
      for (let id of ids) {
        const task = await database.task.dequeueById(id);
        if (task) {
          await processImportSourceTask(flow, task);
        }
      }
    })();
  }

  return NextResponse.json({
    updated: updated,
  });
}