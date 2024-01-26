import { db } from '@/core/db/db';
import { cosineSimilarity } from '@/core/db/db_index';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST (req: NextRequest) {

  const data = z.object({
    ids: z.string().array(),
    q: z.number().array(),
    top_k: z.number(),
  }).parse(await req.json());

  const vec = Float64Array.from(data.q);

  const chunks = await db.selectFrom('document_index_chunk')
    .select([
      'document_index_chunk.id',
      eb => eb.ref('embedding').$castTo<number[]>().as('embedding'),
    ])
    .where('document_index_chunk.id', 'in', data.ids)
    .execute();

  const res = chunks
    .map(chunk => ({
      id: chunk.id,
      score: cosineSimilarity(vec, Float64Array.from(chunk.embedding)),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, data.top_k);

  return NextResponse.json(res);
}

export const dynamic = 'force-dynamic';