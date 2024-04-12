import { getDb } from '@/core/v1/db';
import { defineHandler } from '@/lib/next/handler';
import { z } from 'zod';

export const POST = defineHandler({
  params: z.object({
    id: z.coerce.number().int(),
  }),
  body: z.object({
    status: z.enum(['FAILED']),
  }),
}, async ({
  params,
  body: { status },
}) => {
  const { numUpdatedRows } = await getDb()
    .updateTable('document_import_task')
    .set('status', 'CREATED')
    .set('finished_at', null)
    .where('source_id', '=', params.id)
    .where('status', '=', status)
    .executeTakeFirstOrThrow();

  return {
    rescheduledImportTasks: Number(numUpdatedRows),
  };
});

export const dynamic = 'force-dynamic';
