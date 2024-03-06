import db from '@/core/db';
import { makeDocumentIndexOutdated } from '@/jobs/makeDocumentIndexOutdated';
import { adminHandlerGuard } from '@/lib/auth-server';
import { parseFilters } from '@/lib/database';
import { NextResponse } from 'next/server';

export const POST = adminHandlerGuard(async (req) => {
  const ids = await db.document.listIdsByFilter(parseFilters(req, ['index_state', 'q']));

  await makeDocumentIndexOutdated(ids, 'default');
  return NextResponse.json(ids);
});

export const dynamic = 'force-dynamic';
