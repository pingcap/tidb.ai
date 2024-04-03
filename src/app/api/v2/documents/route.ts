import { listDocuments } from '@/core/v1/document';
import { toPageRequest } from '@/lib/database';
import { defineHandler } from '@/lib/next/handler';

export const GET = defineHandler({
  auth: 'admin',
}, async ({ request }) => {
  return await listDocuments(toPageRequest(request));
});

export const dynamic = 'force-dynamic';
