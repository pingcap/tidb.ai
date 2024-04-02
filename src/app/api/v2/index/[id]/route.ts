import { getIndex } from '@/core/v1/index_';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import z from 'zod';

export const GET = defineHandler({
  params: z.object({
    id: z.coerce.number().int(),
  }),
}, async ({
  params: { id },
}) => {
  const index = await getIndex(id);
  if (!index) {
    notFound();
  }

  return index;
});

export const dynamic = 'force-dynamic';
