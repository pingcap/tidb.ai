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
      await preloadTiFlashReplicas(['document', 'document_index_chunk']);
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

export async function preloadTiFlashReplicas(tables: string[]){
  for (const table of tables) {
    const duration = await measure(async () => {
      return await sql`SELECT /*+ READ_FROM_STORAGE(TIFLASH[${sql.ref(table)}]) */ COUNT(*) FROM ${sql.ref(table)};`.execute(db);
    });
    console.log(`Preload table <${table}> in ${duration} ms`);
  }
}

export async function measure(action: () => Promise<any>){
  const start = new Date();
  await action();
  const end = new Date();
  return end.getTime() - start.getTime();
}

export const dynamic = 'force-dynamic';
