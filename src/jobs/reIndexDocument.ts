import database from '@/core/db';
import type { DB } from '@/core/db/schema';
import { rag } from '@/core/interface';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import type { Selectable } from 'kysely';

export async function reIndexDocument (index: Selectable<DB['index']>, document: Selectable<DB['document']>) {
  const flow = getFlow(baseRegistry);
  const storage = flow.getStorage();
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

    const embeddingContent = chunkedContent as rag.EmbeddedContent<any, any>;
    const vectors = await embeddings.embedChunks(chunkedContent.chunks.map(chunk => chunk.content));

    vectors.forEach((vector, i) => embeddingContent.chunks[i].vector = vector);
    await database.index.finishIndexing(index.name, document.id, embeddingContent);
    console.log('[index] finished', document.id, document.mime);
  } catch (e) {
    await database.index.terminateIndexing(index.name, document.id, e);
    console.error('[index] failed', document.id, document.mime, e);
  }
}