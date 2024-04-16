import { getDb } from '@/core/db';
import { defineHandler } from '@/lib/next/handler';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.coerce.number().int(),
});

const bodySchema = z.object({
  status: z.enum(['FAILED']),
});

export const POST = defineHandler({
  auth: 'admin',
  params: paramsSchema,
  body: bodySchema,
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
