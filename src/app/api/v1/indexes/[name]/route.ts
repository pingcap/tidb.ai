import database from '@/core/db';
import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest, { params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);
  const index = await database.index.findByName(name);

  if (!index) {
    notFound();
  }

  return NextResponse.json(index);
}

export const dynamic = 'force-dynamic';
