import { DefaultDocumentImportService } from '@/core/services/importing';
import { executeInSafeDuration } from '@/lib/next/executeInSafeDuration';
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

  const final = {
    succeed: [] as number[],
    failed: [] as number[],
  };

  const service = new DefaultDocumentImportService({ flow: await getFlow(baseRegistry) });

  await executeInSafeDuration(async () => {
    const results = await service.runTasks(n);
    final.succeed.push(...results.succeed);
    final.failed.push(...results.failed);
    return results.succeed.length > 0;
  }, 60, 0.75, 'document_import_tasks');

  return final;
});

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
