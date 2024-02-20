import db from '@/core/db';
import { makeDocumentIndexOutdated } from '@/jobs/makeDocumentIndexOutdated';
import { parseFilters } from '@/lib/database';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest) {
  const ids = await db.document.listIdsByFilter(parseFilters(req, ['index_state', 'q']));

  await makeDocumentIndexOutdated(ids, 'default')
  return NextResponse.json(ids);
}

export const dynamic = 'force-dynamic';
