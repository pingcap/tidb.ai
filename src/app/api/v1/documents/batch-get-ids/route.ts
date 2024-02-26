import db from '@/core/db';
import { parseFilters } from '@/lib/database';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest) {
  const ids = await db.document.listIdsByFilter(parseFilters(req, ['index_state', 'q']));

  return NextResponse.json(ids);
}

export const dynamic = 'force-dynamic';
