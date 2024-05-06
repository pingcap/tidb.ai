import { getDb } from '@/core/db';
import { getIndexByName } from '@/core/repositories/index_';
import { compareAndSwap } from '@/core/repositories/status';
import { DocumentIndexService } from '@/core/services/indexing';
import { defineHandler } from '@/lib/next/handler';
import { measure } from '@/lib/time';
import { sql } from 'kysely';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const MIN_PRELOAD_ANN_INDEX_INTERVAL = 10 * 60 * 1000; // 10 minutes

const handlerOptions = {
  params: z.object({
    name: z.string(),
  }),
};

export const POST = defineHandler(handlerOptions, async ({ params }) => {
  const index = await getIndexByName(params.name);
  if (!index) {
    notFound();
  }

  try {
    const statusName = `${index.name}_ann_index_last_preload_at`;
    const success = await compareAndSwap<Date>(
      {
        status_name: statusName,
        status_type: 'date',
        status_value: new Date(),
      },
      (oldDate, newDate) => {
        return (newDate.getTime() - oldDate.getTime()) > MIN_PRELOAD_ANN_INDEX_INTERVAL;
      },
      async () => {
        const { provider, embedding } = index.config;
        const tableName = DocumentIndexService.getDocumentVectorTableName(provider, index.name);
        const { column, dimensions } = await getVectorTableColumnAndDimension(tableName);
        await preloadTiFlashANNIndex(tableName, column, dimensions);
      },
      true,
    );

    if (success) {
      return NextResponse.json({
        message: 'success',
      });
    } else {
      return NextResponse.json({
        message: 'skipped',
      });
    }
  } catch (e) {
    console.error('Failed to preload TiFlash replicas:', e);
    return NextResponse.json({
      message: 'error',
    });
  }
});

async function getVectorTableColumnAndDimension (tableName: string) {
  const stmt = sql<{ COLUMN_NAME: string, COLUMN_TYPE: string }>`
      SELECT COLUMN_NAME, COLUMN_TYPE
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = ${sql.val(tableName)} AND COLUMN_TYPE LIKE 'vector%'
      LIMIT 1
  `;

  const result = await stmt.execute(getDb());
  const columnDef = result.rows[0];
  if (!columnDef) {
    throw new Error(`Vector column not found in table <${tableName}>`);
  }

  const match = columnDef.COLUMN_TYPE.match(/vector<float>\((\d+)\)/);
  if (!match) {
    throw new Error(`Invalid vector column type <${columnDef.COLUMN_TYPE}> in table <${tableName}>`);
  }

  return {
    column: columnDef.COLUMN_NAME,
    dimensions: parseInt(match[1]),
  };
}

async function preloadTiFlashANNIndex (tableName: string, vectorColumn: string = 'embedding', dimensions: number = 1536) {
  const duration = await measure(async () => {
    const vector = generateRandomVector(dimensions);
    const stmt = sql`
        SELECT id
        FROM ${sql.ref(tableName)}
        ORDER BY VEC_COSINE_DISTANCE(${sql.ref(vectorColumn)}, ${sql.val(vector)})
        LIMIT 5
    `;
    console.log(`Preloading ANNIndex for table <${tableName}> with sql:`, stmt.compile(getDb()).sql);
    return await stmt.execute(getDb());
  });
  console.log(`Preloaded ANNIndex for table <${tableName}>, took ${duration} ms`);
}

function generateRandomVector (dimension: number): string {
  const vector = Array.from({ length: dimension }, () => parseFloat((Math.random() * 2 - 1).toFixed(2)));
  return JSON.stringify(vector);
}

export const dynamic = 'force-dynamic';
