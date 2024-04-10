import { getDb } from '@/core/v1/db';
import { updateDocument } from '@/core/v1/document';
import { executeInSafeDuration } from '@/lib/next/executeInSafeDuration';
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { select } from 'hast-util-select';
import { toText } from 'hast-util-to-text';
import path from 'path';
import rehypeParse from 'rehype-parse';
import { unified } from 'unified';

export const GET = defineHandler({ auth: 'cronjob' }, async () => {
  const flow = await getFlow(baseRegistry);
  const storage = flow.getStorage();

  const htmlProcessor = unified().use(rehypeParse);

  await executeInSafeDuration(async () => {
    const documents = await getDb()
      .selectFrom('document')
      .select('id')
      .select('content_uri')
      .select('source_uri')
      .where('name', '=', '')
      .where('mime', '=', 'text/html')
      .limit(100)
      .execute();

    if (documents.length == 0) {
      return false;
    }

    await Promise.all(documents.map(async document => {
      let name: string;
      const buffer = await storage.get(document.content_uri);
      const root = htmlProcessor.parse(buffer);
      const node = select('head > title', root);
      if (node) {
        name = toText(node);
      } else {
        name = path.basename(new URL(document.source_uri).pathname);
      }
      await updateDocument(document.id, { name });
      console.log(document.id, document.source_uri, name);
    }));

    return true;
  }, 60, 0.9);
});

export const dynamic = 'force-dynamic';
export const maxDuration = 120;
