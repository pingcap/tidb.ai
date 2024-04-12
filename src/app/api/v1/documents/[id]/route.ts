import { getDocument } from '@/core/repositories/document';
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.coerce.number().int(),
});

export const GET = defineHandler({
  auth: 'admin',
  params: paramsSchema,
}, async ({ params }) => {
  const document = await getDocument(params.id);
  if (!document) {
    notFound();
  }

  const flow = await getFlow(baseRegistry);

  const storage = flow.getStorage();

  const content = await storage.get(document.content_uri);

  return new NextResponse(content, {
    headers: {
      'Content-Type': document.mime,
      'X-Source-Name': document.name,
      'X-Source-Uri': document.source_uri,
    },
  });
});

export const dynamic = 'force-dynamic';
