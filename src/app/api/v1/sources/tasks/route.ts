import database from '@/core/db';
import { toPageRequest } from '@/lib/database';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest) {
  const tasks = await database.importSource.listTasks(toPageRequest(req, ['status']));

  return NextResponse.json(tasks);
}

export const dynamic = 'force-dynamic';