import database from '@/core/db';
import { reIndexDocument } from '@/jobs/reIndexDocument';
import { NextResponse } from 'next/server';

export async function GET () {
  const index = await database.index.findByName('default');
  if (!index) {
    return;
  }

  await reIndexDocument(index, (await database.document.findById('LDrSonjzNijS'))!);

  return NextResponse.json({});
}

export const dynamic = 'force-dynamic';
