import { BaseDocumentStore, BaseNode, type RefDocInfo } from 'llamaindex';

function todo (): never {
  throw new Error('todo');
}

export class AppDocumentStore extends BaseDocumentStore {
  async addDocuments (docs: BaseNode[], allowUpdate: boolean) {
    todo();
  }

  deleteDocument (docId: string, raiseError: boolean): Promise<void> {
    todo();
  }

  deleteRefDoc (refDocId: string, raiseError: boolean): Promise<void> {
    todo();
  }

  docs (): Promise<Record<string, BaseNode>> {
    todo();
  }

  async documentExists (docId: string): Promise<boolean> {
    todo();
  }

  async getAllDocumentHashes (): Promise<any> {
    todo();
  }

  getAllRefDocInfo (): Promise<Record<string, RefDocInfo> | undefined> {
    todo();
  }

  async getDocument (docId: string, raiseError: boolean): Promise<BaseNode | undefined> {
    todo();
  }

  getDocumentHash (docId: string): Promise<string | undefined> {
    todo();
  }

  getRefDocInfo (refDocId: string): Promise<RefDocInfo | undefined> {
    todo();
  }

  setDocumentHash (docId: string, docHash: string): void {
    todo();
  }
}