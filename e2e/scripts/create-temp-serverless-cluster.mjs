import { createPool } from 'mysql2/promise';
import { customAlphabet } from 'nanoid'
import fsp from 'node:fs/promises';

import { config } from 'dotenv';

config({
  path: [
    '.env.backend',
    '.env.backend.local',
  ],
  override: true,
})

const pool = createPool({
  uri: `mysql://${process.env.TIDB_USER}:${process.env.TIDB_PASSWORD}@${process.env.TIDB_HOST}:4000?ssl={"rejectUnauthorized":true}`
});

const genDatabaseName = customAlphabet('abcdef1234567890', 8);
const dbName = `tidb_ai_e2e_temp_${genDatabaseName()}`

await pool.execute(`CREATE DATABASE ${dbName}`);
await fsp.writeFile('.env.backend.generated', `TIDB_DATABASE=${dbName}`);

pool.end();
