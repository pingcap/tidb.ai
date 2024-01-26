import database from '@/core/db';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest) {
  return NextResponse.json(await database.task.stats());
}

export const dynamic = 'force-dynamic';
