import database from '@/core/db';
import type { NextRequest } from 'next/server';

export async function GET (req: NextRequest) {
  database.index
}

export const dynamic = 'force-dynamic';
