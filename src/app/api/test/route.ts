import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { HtmlLoader } from '@/rag-spec/loaders/HtmlLoader';
import { NextResponse } from 'next/server';

export async function GET () {
  const store = getFlow(baseRegistry).getStorage();

  const buffer = await store.get('blob/0g/3YmIyuyK4a');
  const htmlLoader = new HtmlLoader({
    contentExtraction: {
      'www.pingcap.com': [
        { pattern: '/blog/*', contentSelector: '.wysiwyg--post-content' },
      ],
    },
  });

  return NextResponse.json(await htmlLoader.load(buffer, 'https://www.pingcap.com/blog/tide-developing-a-distributed-database-in-a-breeze/'));
}

export const dynamic = 'force-dynamic';
