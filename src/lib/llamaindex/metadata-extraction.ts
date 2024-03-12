import type { DB } from '@/core/db/schema';
import { fromChunk, fromDocument } from '@/lib/llamaindex/node';
import type { Selectable } from 'kysely';
import { IngestionPipeline, KeywordExtractor, type LLM, QuestionsAnsweredExtractor, SummaryExtractor, TitleExtractor } from 'llamaindex';

export function createMetadataExtractionPipeline (llm?: LLM) {
  const pipeline = new IngestionPipeline({
    transformations: [
      new QuestionsAnsweredExtractor({
        llm,
      }),
      new SummaryExtractor({
        llm,
      }),
      new TitleExtractor({
        llm,
      }),
      new KeywordExtractor({
        llm,
      }),
    ],
  });

  return async (document: Selectable<DB['document']>, chunks: Selectable<DB['document_index_chunk_partitioned']>[]) => {
    const nodes = await pipeline.run({
      documents: [fromDocument(document, chunks)],
      nodes: chunks.map(fromChunk),
    });

    return nodes;
  };
}
