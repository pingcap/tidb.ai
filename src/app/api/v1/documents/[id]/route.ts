import db from '@/core/db';
import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';
import {UUID} from "node:crypto";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id) as UUID;
  const documentIndex = await db.index.getDocumentIndex('default', id);
  const document = await db.document.findById(id);
  if (!documentIndex || !document) {
    notFound();
  }

  return NextResponse.json({
    name: document.name,
    text_content: documentIndex.text_content,
    source_uri: document.source_uri,
  });
}

export const dynamic = 'force-dynamic';
