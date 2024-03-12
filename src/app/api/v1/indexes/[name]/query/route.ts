import database from '@/core/db';
import { retrieval, querySchema } from '@/core/retrieval';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest, { params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);
  const index = await database.index.findByName(name);
  if (!index) {
    return new NextResponse(`Index ${name} not found`, { status: 404 });
  }
  const top = await retrieval(name, index.embedding, querySchema.parse(await req.json()));

  return NextResponse.json(top);
}

export const dynamic = 'force-dynamic';
