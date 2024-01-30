import database from '@/core/db';
import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest, { params }: { params: { query_id: string } }) {
  const queryId = decodeURIComponent(params.query_id);

  const query = await database.index.getQuery(queryId);

  if (!query) {
    notFound();
  }

  const results = await database.index.getQueryResults(queryId);

  return NextResponse.json(results);
}

export const dynamic = 'force-dynamic';
