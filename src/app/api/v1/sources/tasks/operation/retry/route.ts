import database from '@/core/db';
import { processImportSourceTask } from '@/jobs/processImportSourceTasks';
import { adminHandlerGuard } from '@/lib/auth-server';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const POST = adminHandlerGuard(async (req) => {
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
});

export const dynamic = 'force-dynamic';
