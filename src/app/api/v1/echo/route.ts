import { SitemapXmlTaskProcessor } from '@/rag-spec/task-processor/SitemapXmlTaskProcessor';
import { NextResponse } from 'next/server';

export async function GET () {
  const p = new SitemapXmlTaskProcessor({});
  const res = await p.process({
    type: 'sitemap',
    url: 'https://docs.pingcap.com/sitemap/sitemap-0.xml',
    created_at: new Date(),
    import_source_id: '1',
    error: null,
    finished_at: null,
    document_id: null,
    parent_task_id: null,
    id: 1,
    status: 'pending',
  });

  return NextResponse.json(res);
}

export const dynamic = 'force-dynamic';
