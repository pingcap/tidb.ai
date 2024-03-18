import database from '@/core/db';
import type { DBDocument } from '@/core/db/document';
import type { DB } from '@/core/db/schema';
import { rag } from '@/core/interface';
import { reIndexDocument } from '@/jobs/reIndexDocument';
import { md5 } from '@/lib/digest';
import { uuidToBin } from '@/lib/kysely';
import type { Selectable } from 'kysely';
import mime from 'mime';
import type { UUID } from 'node:crypto';
import path from 'node:path';

export type DocumentToSave = {
  id: UUID;
  buffer: Buffer;
  mime?: string;
  name?: string;
  sourceUrl: string;
}

export async function saveDocument (storage: rag.DocumentStorage<any>, doc: DocumentToSave) {
  const now = new Date();
  const contentPath = toStoragePath(doc.id);
  const contentUri = await storage.put(contentPath, doc.buffer);
  await database.document.insert([{
    id: doc.id,
    content_uri: contentUri,
    source_uri: doc.sourceUrl,
    mime: doc.mime ?? mime.getType(doc.sourceUrl) ?? 'unknown',
    content: doc.buffer.toString('utf8'),
    name: doc.name ?? path.basename(doc.sourceUrl),
    digest: md5(doc.buffer),
    created_at: now,
    last_modified_at: now,
  }]);

  void triggerIndex(doc.id);

}

export async function updateDocument (storage: rag.DocumentStorage<any>, document: DBDocument, doc: DocumentToSave) {
  const digest = md5(doc.buffer);

  // do not update if digest not changed.
  if (digest !== document.digest) {
    const now = new Date();
    const contentPath = toStoragePath(doc.id);
    const contentUri = await storage.put(contentPath, doc.buffer);

    await database.document.update(document.id, {
      last_modified_at: now,
      content_uri: contentUri,
      content: doc.buffer.toString('utf8'),
      digest,
      mime: doc.mime,
      name: doc.name,
    });

    void triggerIndex(document.id);
  }
}

async function triggerIndex (id: UUID) {

  if (process.env.AUTO_TRIGGER) {
    const document = await database.document.findById(id);
    if (!document) {
      return;
    }

    const index = await database.index.findByName('default');
    if (!index) {
      return;
    }

    await reIndexDocument(index, document);
  }
}

const toStoragePath = (id: string) => path.join('blob', id.slice(0, 2), id.slice(2));
