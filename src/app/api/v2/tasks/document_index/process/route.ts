import { processDocumentIndexTasks } from '@/core/services/indexing';
import { createLlamaindexDocumentIndexTaskProcessor } from '@/jobs/v1/llamaindexDocumentIndexTaskProcessor';
import { defineHandler } from '@/lib/next/handler';
import z from 'zod';

export const GET = defineHandler({
  auth: 'cronjob',
  searchParams: z.object({
    n: z.coerce.number().int().optional(),
  }),
}, async ({ searchParams }) => {
  const n = (searchParams.n ?? parseInt(process.env.INDEX_CONCURRENT || '1'));

  const processor = createLlamaindexDocumentIndexTaskProcessor();

  return await processDocumentIndexTasks(n, processor);
});

export const dynamic = 'force-dynamic';
