import { rag } from '@/core/interface';
import { nodeToChunk, nodeToContent } from '@/lib/llamaindex/converters/base';
import type { AppReader } from '@/lib/llamaindex/converters/reader';
import { BaseEmbedding, BaseExtractor, BaseNode, Document, IngestionPipeline, type NodeParser } from 'llamaindex';

type LlamaindexIndexPipeline = (document: Document) => Promise<BaseNode[]>;

export function createIndexIngestionPipeline (
  reader: AppReader,
  nodeParser: NodeParser,
  metadataExtractors: BaseExtractor[],
  embedding: BaseEmbedding,
) {
  const pipeline = new IngestionPipeline({
    transformations: [
      nodeParser,
      ...metadataExtractors,
      embedding,
    ],
    docStoreStrategy: 'upserts' as any,
    disableCache: true,
  });
  return wrapLlamaindexIndexPipeline(reader, async (document) => {
    return pipeline.run({
      documents: [document],
      inPlace: true,
    });
  });
}

function wrapLlamaindexIndexPipeline (reader: AppReader, f: LlamaindexIndexPipeline){
  return async (buffer: Buffer, mime: string, uri: string) => {
    const [node] = await reader.loadData(buffer, mime, uri);
    const nodes = await f(node);
    return rag.addChunks(
      nodeToContent(node),
      nodes.map(nodeToChunk),
    );
  };
}
