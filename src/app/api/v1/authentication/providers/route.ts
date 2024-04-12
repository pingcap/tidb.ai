import { createProvider, listAllProviders } from '@/core/repositories/auth';
import {defineHandler} from "@/lib/next/handler";
import { NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
  name: z.string(),
  config: z.object({}).passthrough(),
});

export const POST = defineHandler({
  auth: 'admin',
  body: bodySchema,
}, async ({
  body
}) => {
  const { name, config } = body;

  await createProvider(name, config);

  return new NextResponse();
});

const searchParamsSchema = z.object({
  enabled: z.boolean().optional(),
});

export const GET = defineHandler({
  auth: 'admin',
  searchParams: searchParamsSchema
}, async ({
  searchParams: { enabled }
}) => {
  const providers = await listAllProviders(enabled === true ? true : undefined);
  return NextResponse.json(providers);
});

export const dynamic = 'force-dynamic';
