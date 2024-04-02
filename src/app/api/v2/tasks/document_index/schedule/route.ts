import {DEFAULT_INDEX_NAME, scheduleDocumentFirstIndex} from '@/core/services/indexing';
import { getIndexByName } from '@/core/v1/index_';
import { defineHandler } from '@/lib/next/handler';
import z from 'zod';
import {INDEX_NOT_FOUND_ERROR} from "@/lib/errors";

export const GET = defineHandler({
  auth: 'cronjob',
  searchParams: z.object({
    index_name: z.string().optional(),
  }),
}, async ({ searchParams }) => {
  const indexName = searchParams.index_name ?? DEFAULT_INDEX_NAME;
  const index = await getIndexByName(indexName);
  if (!index) {
    throw INDEX_NOT_FOUND_ERROR.format(indexName);
  }

  return await scheduleDocumentFirstIndex(index.id);
});

export const dynamic = 'force-dynamic';
