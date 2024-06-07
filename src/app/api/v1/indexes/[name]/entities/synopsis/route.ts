import { getIndexByName } from '@/core/repositories/index_';
import { KnowledgeGraphClient } from '@/lib/knowledge-graph/client';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import z from 'zod';

export const POST = defineHandler({
  params: z.object({
    name: z.string(),
  }),
  body: z.object({
    name: z.string(),
    description: z.string(),
    topic: z.string(),
    meta: z.object({}).passthrough(),
    entities: z.number().array(),
  }),
  auth: 'admin',
}, async ({ params, body }) => {
  const index = await getIndexByName(params.name);

  if (!index) {
    notFound();
  }

  if (index.config.provider !== 'knowledge-graph') {
    notFound();
  }

  return new KnowledgeGraphClient().createSynopsisEntity(body);
});

export const dynamic = 'force-dynamic';
