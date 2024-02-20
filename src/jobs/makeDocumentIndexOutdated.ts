import db from '@/core/db';
import { reIndexDocument } from '@/jobs/reIndexDocument';

export async function makeDocumentIndexOutdated (documentIds: string[], indexName: string) {
  const index = await db.index.findByName(indexName);
  if (!index) {
    throw new Error(`index ${indexName} not found`);
  }

  await db.document._outdate(documentIds, indexName);
  if (process.env.AUTO_TRIGGER) {
    for (let documentId of documentIds) {
      try {
        const document = await db.document.findById(documentId);
        if (document) {
          await reIndexDocument(index, document);
        }
      } catch (e) {
        console.error(e);
      } finally {
      }
    }
  }
}
