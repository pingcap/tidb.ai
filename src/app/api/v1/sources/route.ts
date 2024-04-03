import database from '@/core/db';
import { NextResponse } from 'next/server';

export { GET } from '@/app/api/v2/sources/route';

async function legacy_GET () {
  const sources = await database.importSource.list();
  const sourceIds = sources.map(source => source.id);
  const taskSummaryItems = await database.importSource.calcTaskSummary(sourceIds);
  const result = sources.map(source => {
    const tasksByStatus = taskSummaryItems
      .filter(taskSummaryItem => taskSummaryItem.import_source_id === source.id)
      .reduce((acc, taskSummaryItem) => {
        acc[taskSummaryItem.status] = taskSummaryItem.tasks;
        return acc;
      }, {} as Record<string, number>);

    return {
      ...source,
      summary: tasksByStatus
    }
  });

  return NextResponse.json(result);
}

export const dynamic = 'force-dynamic';
