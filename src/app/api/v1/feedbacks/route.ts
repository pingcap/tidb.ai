import { listFeedbacks } from '@/core/repositories/feedback';
import { toPageRequest } from '@/lib/database';
import { defineHandler } from '@/lib/next/handler';
import z from 'zod';

export const GET = defineHandler({
  searchParams: z.object({
    chat_id: z.coerce.number().optional(),
    message_id: z.coerce.number().optional(),
  }),
}, async ({ request, searchParams }) => {
  const { page, pageSize, sorting } = toPageRequest(request);

  return await listFeedbacks({
    page,
    pageSize,
    sorting,
    ...searchParams,
  });
});

export const dynamic = 'force-dynamic';
