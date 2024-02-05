import { Flow } from '@/core';
import database from '@/core/db';
import type { DB } from '@/core/db/schema';
import { rag } from '@/core/interface';
import { reIndexDocument } from '@/jobs/reIndexDocument';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import type { Selectable } from 'kysely';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest, { params }: { params: { name: string } }) {
  const start = Date.now();
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const name = decodeURIComponent(params.name);

  const index = await database.index.findByName(name);

  if (!index) {
    throw new Error(`index ${name} not found`);
  }

  let handled = 0;

  while (Date.now() - start < maxDuration * 1000 * 0.75) {
    const docs = await database.document.listByNotIndexed(name, 5);
    if (docs.length === 0) {
      break;
    }

    await reIndex(index, docs);
    handled += docs.length;
  }

  return NextResponse.json({ handled });
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

async function reIndex (index: Selectable<DB['index']>, documents: Selectable<DB['document']>[]) {
  await Promise.all(documents.map(async document => {
    await reIndexDocument(index, document);
  }));
}