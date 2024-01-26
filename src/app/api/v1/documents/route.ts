import db from '@/core/db';
import database from '@/core/db';
import type { DB } from '@/core/db/schema';
import { rag } from '@/core/interface';
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
  const contentType = req.headers.get('Content-Type');

  switch (contentType) {
    case 'text/uri-list':
      await handleUriListV2(req);
      break;
    default:
      return new NextResponse(undefined, { status: 406 });
  }

  return NextResponse.json({});
}

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const toStoragePath = (id: string) => path.join('blob', id.slice(0, 2), id.slice(2));

async function handleUriListV2 (req: NextRequest) {
  await Promise.all((await req.text())
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean)
    .map(async uri => {
      const url = new URL(uri);
      if (url.pathname === '' || url.pathname === '/') {
        await database.importSource.create({
          id: genId(),
          type: 'robots',
          created_at: new Date(),
          url: url.toString(),
        });
      } else {
        throw new Error('only support site root dir now.');
      }
    }));

}

/**
 * @deprecated
 * @param req
 */
async function handleUriList (req: NextRequest) {
  const storage = getFlow(baseRegistry).getStorage();

  const loaders: rag.IUriLoader[] = [
    new GithubRepoUriLoader(storage),
    new DirectFetcher(storage),
  ];

  return await Promise.all((await req.text())
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean)
    .map(uri => {
      const loader = loaders.find(loader => loader.support(uri));
      if (!loader) {
        throw new Error(`cannot handle uri ${uri}`);
      }
      return loader.load(uri);
    }))
    .then(list => list.flatMap(item => item))
    .then(tmpFileList => handleUploadContents(tmpFileList));
}

/**
 * @deprecated
 * @param contents
 */
async function handleUploadContents (contents: RawContent[]) {
  const flow = getFlow(baseRegistry);

  const existsDocuments = await database.document.findBySourceUris(contents.map(c => c.sourceUri));
  const existsUriMap = new Map(existsDocuments.map(e => [e.source_uri, e]));

  const storage = flow.getStorage();

  const documentsToInsert: Insertable<DB['document']>[] = [];

  let cachedDocuments = 0;
  let reImportedDocuments = 0;

  await Promise.all(contents.map(async content => {
    const contentStorage = flow.getStorage(content.storage);

    const dbDoc = existsUriMap.get(content.sourceUri);
    const hash = createHash('md5');
    const now = new Date();
    const buffer = await contentStorage.get(content.uri);

    if (dbDoc) {
      const digest = hash.update(buffer).digest('hex');

      if (dbDoc.digest === digest) {
        cachedDocuments++;
        return;
      }
      reImportedDocuments++;
      // TODO use storage.move if is same storage?
      await storage.put(dbDoc.content_uri, buffer);
      await database.document.update(dbDoc.id, {
        digest,
        last_modified_at: now,
      });
    } else {
      const id = genId();
      const uri = toStoragePath(id);

      await storage.put(uri, buffer);
      documentsToInsert.push({
        id,
        content_uri: uri,
        source_uri: content.sourceUri,
        mime: content.mime ?? 'unknown',
        name: path.basename(content.sourceUri),
        digest: hash.update(buffer).digest('hex'),
        created_at: now,
        last_modified_at: now,
      });
    }

    contentStorage.delete(content.uri);
  }));

  await database.document.insert(documentsToInsert);

  return {
    newDocuments: documentsToInsert.length,
    reImportedDocuments,
    cachedDocuments,
  };
}