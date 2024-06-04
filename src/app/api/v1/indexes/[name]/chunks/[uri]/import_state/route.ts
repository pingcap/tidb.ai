import { getIndexByName } from '@/core/repositories/index_';
import { KnowledgeGraphClient } from '@/lib/knowledge-graph/client';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import z from 'zod';

export const GET = defineHandler({
  params: z.object({
    name: z.string(),
    uri: z.string(),
  }),
  auth: 'admin',
}, async ({ params }) => {
  const index = await getIndexByName(params.name);

  if (!index) {
    notFound();
  }

  if (index.config.provider !== 'knowledge-graph') {
    notFound();
  }

  return new KnowledgeGraphClient().getChunkImportState(params.uri);
});

export const dynamic = 'force-dynamic';
