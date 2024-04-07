import { processDocumentIndexTasks } from '@/core/services/indexing';
import { createLlamaindexDocumentIndexTaskProcessor } from '@/jobs/v1/llamaindexDocumentIndexTaskProcessor';
import { executeInSafeDuration } from '@/lib/next/executeInSafeDuration';
import { defineHandler } from '@/lib/next/handler';
import z from 'zod';

export const GET = defineHandler({
  auth: 'cronjob',
  searchParams: z.object({
    n: z.coerce.number().int().optional(),
  }),
}, async ({ searchParams }) => {
  const n = (searchParams.n ?? parseInt(process.env.INDEX_CONCURRENT || '1'));

  const final = {
    succeed: [] as number[],
    failed: [] as number[],
  };

  const processor = createLlamaindexDocumentIndexTaskProcessor();

  await executeInSafeDuration(async () => {
    const results = await processDocumentIndexTasks(n, processor);
    final.succeed.push(...results.succeed);
    final.failed.push(...results.failed);
    return results.succeed.length > 0 || results.failed.length > 0;
  })

  return final;
});

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
