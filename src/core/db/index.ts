import { chatDb, type ChatDb } from '@/core/db/chat';
import { indexDb, type IndexDb } from '@/core/db/db_index';
import { documentDb, type DocumentDb } from '@/core/db/document';
import { importSourceDb, type ImportSourceDb } from '@/core/db/importSource';
import { taskDb, type TaskDb } from '@/core/db/task';
import {OptionDb, optionDb} from "@/core/db/options";

export interface Database {
  document: DocumentDb;
  index: IndexDb;
  option: OptionDb;
  task: TaskDb;
  importSource: ImportSourceDb,
  chat: ChatDb,
}

const database = {
  document: documentDb,
  index: indexDb,
  option: optionDb,
  task: taskDb,
  importSource: importSourceDb,
  chat: chatDb,
} satisfies Database;

export default database;
