import { createProvider, listAllProviders } from '@/core/db/auth';
import { adminHandlerGuard } from '@/lib/auth-server';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createSchema = z.object({
  name: z.string(),
  config: z.object({}).passthrough(),
});

export const POST = adminHandlerGuard(async (req) => {
  const { name, config } = createSchema.parse(await req.json());

  await createProvider(name, config);

  return new NextResponse();
});

export async function GET (req: NextRequest) {
  const providers = await listAllProviders(req.nextUrl.searchParams.get('enabled') === 'true' ? true : undefined);
  return NextResponse.json(providers);
}

export const dynamic = 'force-dynamic';
