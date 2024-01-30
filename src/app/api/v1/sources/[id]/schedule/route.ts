import database from '@/core/db';
import { scheduleImportSourceTask } from '@/jobs/scheduleImportSourceTask';
import { getErrorMessage } from '@/lib/error';
import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest, { params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const source = await database.importSource.find(id);

  if (!source) {
    notFound();
  }
  try {
    await scheduleImportSourceTask(source);
  } catch (e) {
    return NextResponse.json({
      message: getErrorMessage(e),
    }, { status: 400 });
  }
  return NextResponse.json({
    scheduled: true,
  });
}

export const dynamic = 'force-dynamic';
