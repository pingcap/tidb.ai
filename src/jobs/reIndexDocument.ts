import database from '@/core/db';
import type { DBDocument } from '@/core/db/document';
import type { DB } from '@/core/db/schema';
import { createIndexIngestionPipeline } from '@/lib/llamaindex/indexDocument';
import { fromAppEmbedding } from '@/lib/llamaindex/converters/embedding';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import type { Selectable } from 'kysely';
import { KeywordExtractor, QuestionsAnsweredExtractor, SimpleNodeParser, SummaryExtractor, TitleExtractor } from 'llamaindex';

export async function reIndexDocument (index: Selectable<DB['index']>, document: DBDocument) {
  const flow = await getFlow(baseRegistry, undefined, index.config);
  const storage = flow.getStorage();

  const pipeline = createIndexIngestionPipeline(
    new SimpleNodeParser(), // Deprecate all rag.splitter.
    [
      new TitleExtractor(),
      new SummaryExtractor(),
      new QuestionsAnsweredExtractor(),
      new KeywordExtractor(),
    ],
    fromAppEmbedding(flow.getEmbeddings(index.embedding)));

  try {
    console.log('[index] start', document.id, document.mime);

    await database.index.startIndexing(index.name, document.id, { digest: '', content: [], metadata: {}, chunks: [] });
    const loader = flow.getLoader(document.mime, document.source_uri);
    const buffer = await storage.get(document.content_uri);
    const content = await loader.load(buffer, document.source_uri);

    const embeddingContent = await pipeline(content);

    await database.index.finishIndexing(index.name, document.id, embeddingContent);
    console.log('[index] finished', document.id, document.mime);
  } catch (e) {
    await database.index.terminateIndexing(index.name, document.id, e);
    console.error('[index] failed', document.id, document.mime, e);
  }
}
