import database from '@/core/db';
import { processImportSourceTasks } from '@/jobs/processImportSourceTasks';
import { md5 } from '@/lib/digest';
import { genId } from '@/lib/id';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import mime from 'mime';
import { type NextRequest, NextResponse } from 'next/server';
import path from 'node:path';

export async function GET (req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
  const concurrent = parseInt(req.nextUrl.searchParams.get('concurrent') ?? '10');

  const { processed, succeed, failed } = await processImportSourceTasks(concurrent, maxDuration);

  return NextResponse.json({
    processed_tasks: processed,
    succeed,
    failed,
  });
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
