import database from '@/core/db';
import { db } from '@/core/db/db';
import { createMetadataExtractionPipeline } from '@/lib/llamaindex/metadata-extraction';
import { NextResponse } from 'next/server';

export async function GET () {
  const pipeline = createMetadataExtractionPipeline();

  const doc = await database.document.findById('H9XtDC3MVOp0');
  const chunks = await db.selectFrom('document_index_chunk_partitioned')
    .selectAll()
    .where('document_id', '=', 'H9XtDC3MVOp0')
    .execute();

  const nodes = await pipeline(doc!, chunks);

  return NextResponse.json({ nodes: nodes.map(node => ({ id: node.id_, metadata: node.metadata })) });
}

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';
