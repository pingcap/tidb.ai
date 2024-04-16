import { enableIndex, getIndexByName } from '@/core/repositories/index_';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import { z } from 'zod';

export const POST = defineHandler({
  auth: 'admin',
  params: z.object({
    name: z.string(),
  }),
}, async ({ params }) => {
  const index = await getIndexByName(params.name);
  if (!index) {
    notFound();
  }
  await enableIndex(index.id);
});

export const dynamic = 'force-dynamic';
