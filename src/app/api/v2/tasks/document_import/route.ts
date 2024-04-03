import { listDocumentImportTasks } from '@/core/v1/document_import_task';
import { toPageRequest } from '@/lib/database';
import { defineHandler } from '@/lib/next/handler';
import z from 'zod';

export const GET = defineHandler({
  auth: 'admin',
  searchParams: z.object({
    status: z.enum([
      'CREATED',
      'PENDING',
      'IMPORTING',
      'SUCCEED',
      'FAILED',
    ]).array().optional(),
  }),
}, async ({ request, searchParams, }) => {
  return await listDocumentImportTasks({
    ...toPageRequest (request),
    status: searchParams.status,
  });
});

export const dynamic = 'force-dynamic';
