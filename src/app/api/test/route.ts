import database from '@/core/db';
import { reIndexDocument } from '@/jobs/reIndexDocument';
import { NextResponse } from 'next/server';

export async function GET () {
  const index = await database.index.findByName('default');
  if (!index) {
    return;
  }
  const docs = await database.document.listByNotIndexed('default', 5);


  return NextResponse.json(docs);
}

export const dynamic = 'force-dynamic';
