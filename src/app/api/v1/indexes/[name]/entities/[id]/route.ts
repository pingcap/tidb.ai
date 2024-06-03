import { getIndexByName } from '@/core/repositories/index_';
import { KnowledgeGraphClient } from '@/lib/knowledge-graph/client';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import z from 'zod';

export const GET = defineHandler({
  params: z.object({
    name: z.string(),
    id: z.coerce.number(),
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

  return new KnowledgeGraphClient().getEntity(params.id);
});

export const PUT = defineHandler({
  params: z.object({
    name: z.string(),
    id: z.coerce.number(),
  }),
  body: z.object({}).passthrough(),
  auth: 'admin',
}, async ({ params, body }) => {
  const index = await getIndexByName(params.name);

  if (!index) {
    notFound();
  }

  if (index.config.provider !== 'knowledge-graph') {
    notFound();
  }

  return new KnowledgeGraphClient().updateEntity(params.id, body);
});

export const dynamic = 'force-dynamic';
