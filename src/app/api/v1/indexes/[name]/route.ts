import db from '@/core/db';
import database from '@/core/db';
import { adminHandlerGuard } from '@/lib/auth-server';
import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET (req: NextRequest, { params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);
  const index = await database.index.findByName(name);

  if (!index) {
    notFound();
  }

  return NextResponse.json(index);
}

const updateSchema = z.object({
  llm: z.string().optional(),
  embedding: z.string().optional(),
  reranker: z.string().optional(),
});

export const PUT = adminHandlerGuard(async (req: NextRequest, { params }: { params: { name: string } }) => {
  const result = updateSchema.safeParse(await req.json());
  if (!result.success) {
    return NextResponse.json({ message: result.error.message }, { status: 400 });
  }

  const data = { ...result.data };

  for (let key of Object.keys(result.data)) {
    if (!result.data[key as never]) {
      delete result.data[key as never];
    }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ message: 'Nothing to update' }, { status: 400 });
  }

  const name = decodeURIComponent(params.name);

  await db.index.update(name, () => data);

  return new NextResponse();
});

export const dynamic = 'force-dynamic';
