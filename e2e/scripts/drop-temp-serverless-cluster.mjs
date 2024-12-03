import { createPool } from 'mysql2/promise';
import fsp from 'node:fs/promises';

import { config } from 'dotenv';

config({
  path: [
    '.env.backend',
    '.env.backend.local',
    '.env.backend.generated'
  ],
  override: true,
})

if (!process.env.TIDB_DATABASE) {
  process.exit(0);
}

const pool = createPool({
  uri: `mysql://${process.env.TIDB_USER}:${process.env.TIDB_PASSWORD}@${process.env.TIDB_HOST}:4000/${process.env.TIDB_DATABASE}?ssl={"rejectUnauthorized":true}`
});

await pool.execute(`DROP DATABASE ${process.env.TIDB_DATABASE}`);
await fsp.rm('.env.backend.generated')

pool.end();
