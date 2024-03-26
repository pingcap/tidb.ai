import { processDocumentImportTasks } from '@/core/services/importing';
import { createDocumentImportTaskProcessor } from '@/jobs/v1/documentImportTaskProcessor';
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import z from 'zod';

export const GET = defineHandler({
  auth: 'cronjob',
  searchParams: z.object({
    n: z.coerce.number().int().optional(),
  }),
}, async ({ searchParams }) => {
  const n = (searchParams.n ?? parseInt(process.env.CRAWLER_CONCURRENT || '1'));

  const processor = createDocumentImportTaskProcessor(await getFlow(baseRegistry));

  return await processDocumentImportTasks(n, processor);
});

export const dynamic = 'force-dynamic';
