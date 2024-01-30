import db from '@/core/db';
import database from '@/core/db';
import type { DB } from '@/core/db/schema';
import { rag } from '@/core/interface';
import { addImportSources } from '@/jobs/addImportSources';
import { saveDocument } from '@/jobs/saveDocument';
import { md5 } from '@/lib/digest';
import { genId } from '@/lib/id';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { DirectFetcher } from '@/rag-spec/uri-loader/DirectFetcher';
import { GithubRepoUriLoader } from '@/rag-spec/uri-loader/GithubZipFetcher';
import { createHash } from 'crypto';
import type { Insertable } from 'kysely';
import { type NextRequest, NextResponse } from 'next/server';
import path from 'node:path';
import RawContent = rag.RawContent;

export async function GET (req: NextRequest) {
  const allDocuments = await db.document.listAll();

  return NextResponse.json(allDocuments);
}

export async function PUT (req: NextRequest) {
  const contentType = req.headers.get('Content-Type')?.split(';')[0];

  switch (contentType) {
    case 'text/uri-list':
      await handleUriListV2(req);
      break;
    case 'multipart/form-data':
      await handleMultipart(req);
      break;
    default:
      return new NextResponse(undefined, { status: 406 });
  }

  return NextResponse.json({});
}

export const dynamic = 'force-dynamic';

async function handleUriListV2 (req: NextRequest) {
  const uriList = (await req.text())
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);
  await addImportSources(uriList);
}

async function handleMultipart (req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');
  const sourceUri = formData.get('sourceUri');

  if (!(file instanceof Blob)) {
    throw new Error('file is required');
  }
  if (typeof sourceUri !== 'string') {
    throw new Error('sourceUri is required');
  }
  const store = getFlow(baseRegistry).getStorage();

  await saveDocument(store, {
    id: genId(),
    sourceUrl: sourceUri,
    mime: file.type,
    buffer: Buffer.from(await file.arrayBuffer()),
  })
}
