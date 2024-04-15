import { getDb } from '@/core/db';
import { createIndex, getIndex, type IndexConfig, IndexProviderName, listIndexes } from '@/core/repositories/index_';
import { toPageRequest } from '@/lib/database';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import { z } from 'zod';

export const GET = defineHandler({
  auth: 'admin',
}, async ({ request }) => {
  return await listIndexes(toPageRequest(request));
});

export const POST = defineHandler({
  auth: 'admin',
  body: z.object({
    name: z.string(),
    duplicate_from: z.number().int().optional(),
  }),
}, async ({
  body,
}) => {
  let config: IndexConfig;
  if (body.duplicate_from) {
    const index = await getIndex(body.duplicate_from);
    if (!index) {
      notFound();
    }
    config = index.config;
  } else {
    config = {
      provider: IndexProviderName.LLAMAINDEX,
      embedding: { provider: 'openai', config: { model: 'text-embedding-3-small', vectorColumn: 'embedding', vectorDimension: 1536 } },
      llm: { provider: 'openai', config: { model: 'gpt-3.5-turbo' } },
      metadata_extractors: [],
      parser: {},
      reader: {},
    };
  }

  const { max_id } = await getDb()
    .selectFrom('index')
    .select(eb => eb.fn.max('id').as('max_id'))
    .executeTakeFirstOrThrow();

  return await createIndex({
    id: max_id + 1,
    name: body.name,
    config,
    created_at: new Date(),
    last_modified_at: new Date(),
    configured: 0,
  });
});

export const dynamic = 'force-dynamic';
