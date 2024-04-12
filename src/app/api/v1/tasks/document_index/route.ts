import { listDocumentIndexTasks } from '@/core/repositories/document_index_task';
import { toPageRequest } from '@/lib/database';
import { defineHandler } from '@/lib/next/handler';
import z from 'zod';

export const GET = defineHandler({
  auth: 'admin',
  searchParams: z.object({
    status: z.enum([
      'CREATED',
      'PENDING',
      'INDEXING',
      'SUCCEED',
      'FAILED',
    ]).array().optional(),
  }),
}, async ({ request, searchParams }) => {
  return await listDocumentIndexTasks({
    ...toPageRequest(request),
    status: searchParams.status,
  });
});

export const dynamic = 'force-dynamic';
