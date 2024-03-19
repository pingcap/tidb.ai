import db from '@/core/db';
import { documentToNode, nodeToDocument } from '@/lib/llamaindex/converters/document';
import { BaseDocumentStore, BaseNode, type RefDocInfo } from 'llamaindex';
import type { UUID } from 'node:crypto';

function todo (): never {
  throw new Error('todo');
}

export class AppDocumentStore extends BaseDocumentStore {
  async addDocuments (docs: BaseNode[], allowUpdate: boolean) {
    await db.document.insertAll(docs.map(doc => nodeToDocument(doc as any)), allowUpdate);
  }

  deleteDocument (docId: string, raiseError: boolean): Promise<void> {
    throw new Error('delete not supported now');
  }

  deleteRefDoc (refDocId: string, raiseError: boolean): Promise<void> {
    throw new Error('delete not supported now');
  }

  docs (): Promise<Record<string, BaseNode>> {
    todo();
  }

  async documentExists (docId: string): Promise<boolean> {
    return !!await db.document.findById(docId as UUID);
  }

  async getAllDocumentHashes () {
    const docs = await db.document.getAllDigest();

    return docs.reduce((record, doc) => {
      record[doc.id] = doc.digest;
      return record;
    }, {} as Record<string, string>);
  }

  getAllRefDocInfo (): Promise<Record<string, RefDocInfo> | undefined> {
    todo();
  }

  async getDocument (docId: string, raiseError: boolean): Promise<BaseNode | undefined> {
    const document = await db.document.findById(docId as UUID);
    if (!document) {
      if (raiseError) {
        throw new Error(`document ${docId} not found`);
      }
      return undefined;
    }
    return documentToNode(document);
  }

  getDocumentHash (docId: string): Promise<string | undefined> {
    return db.document.getDigest(docId as UUID);
  }

  getRefDocInfo (refDocId: string): Promise<RefDocInfo | undefined> {
    todo();
  }

  setDocumentHash (docId: string, docHash: string): void {
    void db.document.updateDigest(docId as UUID, docHash);
  }
}