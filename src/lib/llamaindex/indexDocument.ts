import { rag } from '@/core/interface';
import type { Document as CoreDocument } from '@/core/repositories/document';
import { nodeToChunk, nodeToContent } from '@/lib/llamaindex/builders/base';
import type { AppReader } from '@/lib/llamaindex/builders/reader';
import { BaseEmbedding, BaseExtractor, BaseNode, Document, IngestionPipeline, type NodeParser } from 'llamaindex';
import type { UUID } from 'node:crypto';

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

function wrapLlamaindexIndexPipeline (reader: AppReader, f: LlamaindexIndexPipeline) {
  return async (dbDocument: Pick<CoreDocument, 'mime' | 'content_uri' | 'source_uri'>, previousDocumentNodeId?: UUID) => {
    const [node] = await reader.loadData(dbDocument);
    if (previousDocumentNodeId) {
      node.id_ = previousDocumentNodeId;
    }
    const nodes = await f(node);
    return rag.addChunks(
      nodeToContent(node),
      nodes.map(nodeToChunk),
    );
  };
}
