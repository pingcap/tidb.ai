import { getIndex, updateIndexConfig } from '@/core/v1/index_';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import z from 'zod';

export const GET = defineHandler({
  params: z.object({
    id: z.coerce.number().int(),
    key: z.enum(['parser', 'metadata_extractors', 'llm', 'embedding']),
  }),
}, async ({
  params: {
    id, key,
  },
}) => {
  const index = await getIndex(id);
  if (!index) {
    notFound();
  }

  return index.config[key];
});

export const PUT = defineHandler({
  params: z.object({
    id: z.coerce.number().int(),
    key: z.enum(['parser', 'metadata_extractors', 'llm']),
  }),
  body: z.any(),
}, async ({
  params: { id, key },
  body,
}) => {
  const index = await getIndex(id);
  if (!index) {
    notFound();
  }

  // TODO: validate config schema

  await updateIndexConfig(id, `.${key}`, body);
});

export const dynamic = 'force-dynamic';
