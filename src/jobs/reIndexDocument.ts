import database from '@/core/db';
import type { DBDocument } from '@/core/db/document';
import type { DB } from '@/core/db/schema';
import { fromAppEmbedding } from '@/lib/llamaindex/converters/embedding';
import { fromAppChatModel } from '@/lib/llamaindex/converters/llm';
import { fromFlowReaders } from '@/lib/llamaindex/converters/reader';
import { createIndexIngestionPipeline } from '@/lib/llamaindex/indexDocument';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import type { Selectable } from 'kysely';
import { KeywordExtractor, QuestionsAnsweredExtractor, SentenceWindowNodeParser, SummaryExtractor, TitleExtractor } from 'llamaindex';

export async function reIndexDocument (index: Selectable<DB['index']>, document: DBDocument) {
  const flow = await getFlow(baseRegistry, undefined, index.config);

  const llm = fromAppChatModel(flow.getChatModel(index.llm));

  const pipeline = createIndexIngestionPipeline(
    fromFlowReaders(flow), // wrapped llamaindex.reader auto choosing rag.loader
    new SentenceWindowNodeParser(), // Deprecate all rag.splitter.
    [
      new TitleExtractor({ llm }),
      new SummaryExtractor({ llm }),
      new QuestionsAnsweredExtractor({ llm }),
      new KeywordExtractor({ llm }),
    ],
    fromAppEmbedding(flow.getEmbeddings(index.embedding)),
  );

  try {
    console.log('[index] start', document.id, document.mime);

    await database.index.startIndexing(index.name, document.id, { hash: '', content: [], metadata: {}, chunks: [] });

    const embeddingContent = await pipeline(document);

    await database.index.finishIndexing(index.name, document.id, embeddingContent);
    console.log('[index] finished', document.id, document.mime);
  } catch (e) {
    await database.index.terminateIndexing(index.name, document.id, e);
    console.error('[index] failed', document.id, document.mime, e);
  }
}
