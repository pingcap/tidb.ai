import db from '@/core/db';
import { adminHandlerGuard } from '@/lib/auth-server';
import { parseFilters } from '@/lib/database';
import { NextResponse } from 'next/server';

export const GET = adminHandlerGuard(async (req) => {
  const ids = await db.document.listIdsByFilter(parseFilters(req, ['index_state', 'q']));

  return NextResponse.json(ids);
});

export const dynamic = 'force-dynamic';
