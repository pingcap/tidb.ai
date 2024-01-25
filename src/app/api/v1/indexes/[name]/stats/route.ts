import database from '@/core/db';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest, { params }: { params: { name: string }}) {
  const name = decodeURIComponent(params.name);

  return NextResponse.json(await database.document.getIndexState(name))
}
