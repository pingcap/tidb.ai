import {getIndex, getIndexByName, updateIndexConfig} from '@/core/repositories/index_';
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { notFound } from 'next/navigation';
import z from 'zod';

const params = z.object({
  name: z.string(),
  provider: z.string(),
});

export const GET = defineHandler({ params }, async ({
  params: {
    name, provider,
  },
}) => {
  const index = await getIndexByName(name);
  if (!index) {
    notFound();
  }

  return index.config.reader[provider] ?? null;
});

export const PUT = defineHandler({
  params: z.object({
    name: z.string(),
    provider: z.string(),
  }),
  body: z.any(),
}, async ({
  params: { name, provider },
  body,
}) => {
  const index = await getIndexByName(name);
  if (!index) {
    notFound();
  }
  const component = await baseRegistry.getComponent(provider);

  if (!component) {
    notFound();
  }

  await component.optionsSchema.parse(body);

  await updateIndexConfig(index.id, `.reader.${provider}`, body);
});

export const dynamic = 'force-dynamic';
