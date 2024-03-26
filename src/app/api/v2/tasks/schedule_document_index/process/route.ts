import { scheduleDocumentFirstIndex } from '@/core/services/indexing';
import { getIndexByName } from '@/core/v1/index_';
import { defineHandler } from '@/lib/next/handler';
import z from 'zod';

export const GET = defineHandler({
  auth: 'cronjob',
  searchParams: z.object({
    index_name: z.string().optional(),
  }),
}, async ({ searchParams }) => {
  const indexName = searchParams.index_name ?? 'default';
  const index = await getIndexByName(indexName);
  if (!index) {
    throw new Error(`index ${indexName} not found`);
  }
  return await scheduleDocumentFirstIndex(index.id);
});

export const dynamic = 'force-dynamic';
