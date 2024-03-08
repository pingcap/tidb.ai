import { chatDb, type ChatDb } from '@/core/db/chat';
import { indexDb, type IndexDb } from '@/core/db/db_index';
import { documentDb, type DocumentDb } from '@/core/db/document';
import { importSourceDb, type ImportSourceDb } from '@/core/db/importSource';
import { taskDb, type TaskDb } from '@/core/db/task';
import {OptionDb, optionDb} from "@/core/db/options";
import {statusDb, StatusDb} from "@/core/db/status";
import {NamespaceDb, namespaceDb} from "@/core/db/namespace";

export interface Database {
  document: DocumentDb;
  namespace: NamespaceDb;
  index: IndexDb;
  option: OptionDb;
  task: TaskDb;
  importSource: ImportSourceDb,
  chat: ChatDb,
  status: StatusDb;
}

const database = {
  namespace: namespaceDb,
  document: documentDb,
  index: indexDb,
  option: optionDb,
  task: taskDb,
  importSource: importSourceDb,
  chat: chatDb,
  status: statusDb
} satisfies Database;

export default database;
