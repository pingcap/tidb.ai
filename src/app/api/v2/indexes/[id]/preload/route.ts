import {getDocumentVectorTableName} from "@/core/services/indexing";
import {getDb, kysely} from "@/core/v1/db";
import {getIndex} from "@/core/v1/index_";
import {compareAndSwap} from "@/core/v1/status";
import {defineHandler} from "@/lib/next/handler";
import {measure} from "@/lib/time";
import {DateTime} from "luxon";
import {notFound} from "next/navigation";
import {NextResponse} from 'next/server';
import {sql} from "kysely";
import {z} from "zod";

const MIN_PRELOAD_ANN_INDEX_INTERVAL = 10 * 60 * 1000; // 10 minutes

const handlerOptions = {
  params: z.object({
    id: z.coerce.number().int(),
  }),
};

export const POST = defineHandler(handlerOptions, async ({ params}) => {
  const index = await getIndex(params.id);
  if (!index) {
    notFound();
  }

  try {
    const statusName = `${index.name}_ann_index_last_preload_at`
    const success = await compareAndSwap<Date>(
      {
        status_name: statusName,
        status_type: 'date',
        status_value: new Date()
      },
      (oldDate , newDate) => {
        return (newDate.getTime() - oldDate.getTime()) > MIN_PRELOAD_ANN_INDEX_INTERVAL;
      },
      async () => {
        const { provider, embedding } = index.config;
        const { vectorColumn, vectorDimension } = embedding.config;
        const tableName = getDocumentVectorTableName(provider, index.name);
        await preloadTiFlashANNIndex(tableName, vectorColumn, vectorDimension);
      },
      true
    );

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
});

async function preloadTiFlashANNIndex(tableName: string, vectorColumn: string = 'embedding', vectorDimension: number = 1536){
  const duration = await measure(async () => {
    const vector = generateRandomVector(vectorDimension);
    const stmt = sql`
      SELECT id
      FROM ${sql.ref(tableName)}
      ORDER BY VEC_COSINE_DISTANCE(${sql.ref(vectorColumn)}, ${sql.val(vector)})
      LIMIT 5;
    ;`;
    console.log(`Preloading ANNIndex for table <${tableName}> with sql:`, stmt.compile(getDb()).sql);
    return await stmt.execute(getDb());
  });
  console.log(`Preloaded ANNIndex for table <${tableName}>, took ${duration} ms`);
}

function generateRandomVector(dimension: number): string {
  const vector = Array.from({length: dimension}, () => parseFloat((Math.random() * 2 - 1).toFixed(2)));
  return JSON.stringify(vector);
}

export const dynamic = 'force-dynamic';
