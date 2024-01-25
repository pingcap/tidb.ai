import { indexDb, type IndexDb } from '@/core/db/db_index';
import { documentDb, type DocumentDb } from '@/core/db/document';

export interface Database {
  document: DocumentDb;
  index: IndexDb;
}

const database = {
  document: documentDb,
  index: indexDb,
} satisfies Database;

export default database;
