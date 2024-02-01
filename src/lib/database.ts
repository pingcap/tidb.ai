import type { DB } from '@/core/db/schema';
import type { SelectQueryBuilder } from 'kysely';
import type { NextRequest } from 'next/server';

export type Page<T> = {
  page: number
  pageSize: number
  total: number
  data: T[]
}

export type PageRequest<P extends Record<string, any> = {}> = P & {
  page: number
  pageSize: number
}

export async function executePage<DB, TB extends keyof DB, O> (builder: SelectQueryBuilder<DB, TB, O>, request: PageRequest) {
  const res = await builder
    .clearSelect()
    .select(eb => eb.fn.countAll<number>().as('total'))
    .executeTakeFirstOrThrow();

  const data = await builder
    .limit(request.pageSize)
    .offset((request.page - 1) * request.pageSize)
    .execute();

  return {
    total: (res as any).total,
    data,
    page: request.page,
    pageSize: request.pageSize,
  };
}

export function toPageRequest (req: NextRequest): PageRequest {
  const rawPage = req.nextUrl.searchParams.get('page') || '1';
  const rawPageSize = req.nextUrl.searchParams.get('page_size') || '10';

  let page = Math.floor(Number(rawPage));
  let pageSize = Math.floor(Number(rawPageSize));

  if (page <= 0 || !isFinite(page)) {
    page = 1;
  }

  if (pageSize <= 0 || !isFinite(page)) {
    pageSize = 10;
  } else if (pageSize > 100) {
    pageSize = 100;
  }

  return { page, pageSize };
}
