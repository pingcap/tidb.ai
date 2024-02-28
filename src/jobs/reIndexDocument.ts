import database from '@/core/db';
import type { DB } from '@/core/db/schema';
import { rag } from '@/core/interface';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import type { Selectable } from 'kysely';
import ChunkedContent = rag.ChunkedContent;
import EmbeddedContent = rag.EmbeddedContent;

export async function reIndexDocument (index: Selectable<DB['index']>, document: Selectable<DB['document']>) {
  const flow = await getFlow(baseRegistry, undefined, index.config);
  const storage = flow.getStorage();
  try {
    console.log('[index] start', document.id, document.mime);
    const metadata: any = {};

    await database.index.startIndexing(index.name, document.id, { digest: '', content: [], metadata: {}, chunks: [] });
    const loader = flow.getLoader(document.mime, document.source_uri);
    const buffer = await storage.get(document.content_uri);
    const content = await loader.load(buffer, document.source_uri);
    extractMetadata('loader', loader, metadata, content);

    const splitter = flow.getSplitter(content);
    const chunkedContent = await splitter.split(content);
    extractMetadata('splitter', splitter, metadata, content);

    const embeddings = flow.getEmbeddings(index.llm);
    const vectors = await embeddings.embedChunks(chunkedContent.chunks.map(chunk => chunk.content));
    const embeddingContent = toEmbeddedContent(chunkedContent, vectors);
    extractMetadata('embedding', embeddings, metadata, content);

    embeddingContent.metadata = metadata;
    await database.index.finishIndexing(index.name, document.id, embeddingContent);
    console.log('[index] finished', document.id, document.mime);
  } catch (e) {
    await database.index.terminateIndexing(index.name, document.id, e);
    console.error('[index] failed', document.id, document.mime, e);
  }
}

function extractMetadata (key: string, component: rag.Base<any>, target: any, source: { metadata: any }) {
  source.metadata.id = component.identifier;
  target[key] = source.metadata;
  source.metadata = {};
}

function toEmbeddedContent (chunkedContent: ChunkedContent<any, any>, vectors: Float64Array[]): EmbeddedContent<any, any> {
  const { chunks, ...content } = chunkedContent;

  return {
    ...content,
    chunks: chunks.map((chunk, i) => ({
      ...chunk,
      vector: vectors[i],
    })),
  };
}
