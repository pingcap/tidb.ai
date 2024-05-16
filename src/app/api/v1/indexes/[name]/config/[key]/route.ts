import {getIndexByName, getIndexByNameOrThrow, updateIndexConfig} from '@/core/repositories/index_';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import z from 'zod';

export const GET = defineHandler({
  params: z.object({
    name: z.string(),
    key: z.enum(['parser', 'reader', 'metadata_extractors', 'llm', 'embedding']),
  }),
}, async ({
  params: {
    name, key,
  },
}) => {
  const index = await getIndexByName(name);
  if (!index) {
    notFound();
  }

  return index.config[key];
});

export const PUT = defineHandler({
  params: z.object({
    name: z.string(),
    key: z.enum(['parser', 'reader', 'metadata_extractors', 'llm', 'embedding']),
  }),
  body: z.any(),
}, async ({
  params: { name, key },
  body,
}) => {
  const index = await getIndexByNameOrThrow(name);
  // TODO: validate config schema
  await updateIndexConfig(index.id, `.${key}`, body);
});

export const dynamic = 'force-dynamic';
