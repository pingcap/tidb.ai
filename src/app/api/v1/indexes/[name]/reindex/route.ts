import { Flow } from '@/core';
import database from '@/core/db';
import type { DB } from '@/core/db/schema';
import { rag } from '@/core/interface';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import type { Selectable } from 'kysely';
import { type NextRequest, NextResponse } from 'next/server';
import EmbeddedContent = rag.EmbeddedContent;

export async function POST (req: NextRequest, { params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);

  const index = await database.index.findByName(name);

  if (!index) {
    throw new Error(`index ${name} not found`);
  }

  const flow = getFlow(baseRegistry);

  const docs = await database.document.listByNotIndexed(name, 25);

  await reIndex(flow, index, docs);

  return NextResponse.json({ scheduled: docs.length });
}

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

async function reIndex (flow: Flow, index: Selectable<DB['index']>, documents: Selectable<DB['document']>[]) {
  const storage = flow.getStorage();

  for (const document of documents) {
    try {
      console.log('[index] start', document.id, document.mime);
      await database.index.startIndexing(index.name, document.id, { digest: '', content: '', metadata: {}, chunks: [] });
      const loader = flow.getLoader(document.mime);
      const buffer = await storage.get(document.content_uri);
      const content = await loader.load(buffer);

      const splitter = flow.getSplitter(content);
      const chunkedContent = await splitter.split(content);
      await database.index.startIndexing(index.name, document.id, chunkedContent);

      const embeddings = flow.getEmbeddings(index.llm);

      const embeddingContent = chunkedContent as EmbeddedContent<any, any>;
      const vectors = await embeddings.embedChunks(chunkedContent.chunks.map(chunk => chunk.content));

      vectors.forEach((vector, i) => embeddingContent.chunks[i].vector = vector);
      await database.index.finishIndexing(index.name, document.id, embeddingContent);
      console.log('[index] finished', document.id, document.mime);
    } catch (e) {
      await database.index.terminateIndexing(index.name, document.id, e);
      console.error('[index] failed', document.id, document.mime, e);
    }
  }
}