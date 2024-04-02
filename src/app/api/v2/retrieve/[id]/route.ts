import { getRetrieve, getRetrieveResults } from '@/core/v1/retrieve';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import z from 'zod';

export const GET = defineHandler({
  params: z.object({
    id: z.coerce.number().int(),
  }),
}, async ({
  params,
}) => {
  const retrieve = await getRetrieve(params.id);
  if (!retrieve) {
    notFound();
  }

  const results = await getRetrieveResults(retrieve.id);

  return {
    ...retrieve,
    results,
  };
});

export const dynamic = 'force-dynamic';
