import { OptionDb, optionDb } from '@/core/db/options';
import { statusDb, StatusDb } from '@/core/db/status';

export interface Database {
  option: OptionDb;
  status: StatusDb;
}

const database = {
  option: optionDb,
  status: statusDb,
} satisfies Database;

export default database;
