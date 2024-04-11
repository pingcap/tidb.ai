import { getIndex, updateIndexConfig } from '@/core/v1/index_';
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { notFound } from 'next/navigation';
import z from 'zod';

export const GET = defineHandler({
  params: z.object({
    id: z.coerce.number().int(),
    provider: z.string(),
  }),
}, async ({
  params: {
    id, provider,
  },
}) => {
  const index = await getIndex(id);
  if (!index) {
    notFound();
  }

  return index.config.reader[provider] ?? null;
});

export const PUT = defineHandler({
  params: z.object({
    id: z.coerce.number().int(),
    provider: z.string(),
  }),
  body: z.any(),
}, async ({
  params: { id, provider },
  body,
}) => {
  if (!await getIndex(id)) {
    notFound();
  }
  const component = await baseRegistry.getComponent(provider);

  if (!component) {
    notFound();
  }

  await component.optionsSchema.parse(body);

  await updateIndexConfig(id, `.reader.${provider}`, body);
});

export const dynamic = 'force-dynamic';
