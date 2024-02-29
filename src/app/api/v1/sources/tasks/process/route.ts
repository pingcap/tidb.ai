import { processImportSourceTasks } from '@/jobs/processImportSourceTasks';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
  const concurrent = parseInt(req.nextUrl.searchParams.get('concurrent') || process.env.CRAWLER_CONCURRENT || '1');

  const { processed, succeed, failed } = await processImportSourceTasks(concurrent, maxDuration);

  return NextResponse.json({
    processed_tasks: processed,
    succeed,
    failed,
  });
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
