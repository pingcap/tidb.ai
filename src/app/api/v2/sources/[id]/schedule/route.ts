import { createDocumentImportTaskFromSource } from '@/core/services/importing';
import { defineHandler } from '@/lib/next/handler';
import z from 'zod';

export const POST = defineHandler({
  params: z.object({
    id: z.coerce.number().int(),
  }),
}, async ({ params: { id } }) => {
  return await createDocumentImportTaskFromSource(id);
});

export const dynamic = 'force-dynamic';
