import { getDocument } from '@/core/v1/document';
import { getIndexByName } from '@/core/v1/index_';
import { fromFlowReaders } from '@/lib/llamaindex/converters/reader';
import { createIndexIngestionPipeline } from '@/lib/llamaindex/indexDocument';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { BaseEmbedding, SentenceSplitter, SentenceWindowNodeParser, SimpleNodeParser } from 'llamaindex';
import { NextResponse } from 'next/server';

export async function GET () {
  const index = (await getIndexByName('default'))!;

  const flow = await getFlow(baseRegistry, undefined, index.config);

  // Initialize the reader from legacy loaders.
  const reader = fromFlowReaders(flow, index.config.reader); // wrapped llamaindex.reader auto choosing rag.loader

  // Initialize llamaindex node parser from config.
  const { textSplitter, ...parserConfig } = index.config.parser;
  const parser = new SimpleNodeParser({
    textSplitter: new SentenceSplitter({
      chunkSize: 512,
      chunkOverlap: 0,
    }),
    ...parserConfig,
  });

  console.log(parser.textSplitter, parser);

  // Select and config the embedding (important and immutable)

  // Create the default llamaindex pipeline
  const pipeline = createIndexIngestionPipeline(
    reader,
    parser, // Deprecate all rag.splitter.
    [],
    new class extends BaseEmbedding {
      getQueryEmbedding (query: string): Promise<number[]> {
        return Promise.resolve([]);
      }

      getTextEmbedding (text: string): Promise<number[]> {
        return Promise.resolve([]);
      }
    },
  );

  return NextResponse.json(await pipeline((await getDocument(30108))!));
}

export const dynamic = 'force-dynamic';
