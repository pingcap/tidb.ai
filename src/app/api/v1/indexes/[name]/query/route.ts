import { query, querySchema } from '@/core/query';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest, { params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);

  const top = await query(name, querySchema.parse(await req.json()));

  return NextResponse.json(top);
}
