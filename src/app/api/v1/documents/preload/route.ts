import {type NextRequest, NextResponse} from 'next/server';
import {sql} from "kysely";
import database from "@/core/db";
import {db} from "@/core/db/db";

export async function POST (req: NextRequest) {
  try {
    const success = await database.status.compareAndSwap<Date>('last_preload_at', new Date(), (oldDate, newDate) => {
      // The interval of preloading should more than 10 minutes.
      return (newDate.getTime() - oldDate.getTime()) > 10 * 60 * 1000;
    }, async () => {
      console.log('Preloading TiFlash replicas ...')
      await preloadTiFlashReplicas([
        {
          table: 'document',
          columns: ['source_uri']
        },
        {
          table: 'document_index_chunk',
          columns: ['embedding']
        }
      ]);
      return;
    });

    if (success) {
      return NextResponse.json({
        message: 'success'
      });
    } else {
      return NextResponse.json({
        message: 'skipped'
      });
    }
  } catch (e) {
    console.error('Failed to preload TiFlash replicas:', e);
    return NextResponse.json({
      message: 'error'
    });
  }
}

interface PreloadConfig {
  table: string,
  columns: string[]
}

async function preloadTiFlashReplicas(configs: PreloadConfig[]){
  for (const cfg of configs) {
    const duration = await measure(async () => {
      const columns = cfg.columns.map((c) => sql.ref(c));
      const stmt = sql`SELECT /*+ READ_FROM_STORAGE(TIFLASH[${sql.ref(cfg.table)}]) */ COUNT(${sql.join(columns, sql.lit(','))}) FROM ${sql.ref(cfg.table)};`;
      console.log(`Preloading table <${cfg.table}> with sql:`, stmt.compile(db).sql);
      return await stmt.execute(db);
    });
    console.log(`Preload table <${cfg.table}> in ${duration} ms`);
  }
}

async function measure(action: () => Promise<any>){
  const start = new Date();
  await action();
  const end = new Date();
  return end.getTime() - start.getTime();
}

export const dynamic = 'force-dynamic';
