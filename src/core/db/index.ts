import { OptionDb, optionDb } from '@/core/db/options';

export interface Database {
  option: OptionDb;
}

const database = {
  option: optionDb,
} satisfies Database;

export default database;
