import { DocumentImportService } from '@/core/services/importing';
import { defineHandler } from '@/lib/next/handler';
import z from 'zod';

export const POST = defineHandler({
  auth: 'admin',
  params: z.object({
    id: z.coerce.number().int(),
  }),
}, async ({ params: { id } }) => {
  return await DocumentImportService.createTaskFromSource(id);
});

export const dynamic = 'force-dynamic';
