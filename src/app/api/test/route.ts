import database from '@/core/db';
import { NextResponse } from 'next/server';

export async function GET () {

  const docs = await database.document.listByNotIndexed('default', 5);

  return NextResponse.json(docs);
}

export const dynamic = 'force-dynamic';
