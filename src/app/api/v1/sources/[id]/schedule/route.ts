import database from '@/core/db';
import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest, { params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const source = await database.importSource.find(id);

  if (!source) {
    notFound();
  }

  switch (source.type) {
    case 'robots':
      await database.task.enqueue({
        type: 'robots',
        url: source.url,
        import_source_id: source.id,
        created_at: new Date(),
        status: 'pending',
      });
      break;
    default:
      return NextResponse.json({
        message: `Does not support import source type ${source.type}`,
      });
  }

  return NextResponse.json({
    scheduled: true,
  });
}