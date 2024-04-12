import { getIndexByName} from '@/core/repositories/index_';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import z from 'zod';

export const GET = defineHandler({
  params: z.object({
    name: z.string(),
  }),
}, async ({
  params: { name },
}) => {
  const index = await getIndexByName(name);
  if (!index) {
    notFound();
  }

  return index;
});

export const dynamic = 'force-dynamic';
