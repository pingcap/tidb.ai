import { indexDb, type IndexDb } from '@/core/db/db_index';
import { documentDb, type DocumentDb } from '@/core/db/document';
import { importSourceDb, type ImportSourceDb } from '@/core/db/importSource';
import { taskDb, type TaskDb } from '@/core/db/task';
import {OptionDb, optionDb} from "@/core/db/options";
import {statusDb, StatusDb} from "@/core/db/status";

export interface Database {
  document: DocumentDb;
  index: IndexDb;
  option: OptionDb;
  task: TaskDb;
  importSource: ImportSourceDb,
  status: StatusDb;
}

const database = {
  document: documentDb,
  index: indexDb,
  option: optionDb,
  task: taskDb,
  importSource: importSourceDb,
  status: statusDb
} satisfies Database;

export default database;
