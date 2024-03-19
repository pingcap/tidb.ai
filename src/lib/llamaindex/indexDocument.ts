import { rag } from '@/core/interface';
import { contentToNode, nodeToChunk, nodeToContent } from '@/lib/llamaindex/converters/base';
import { BaseEmbedding, BaseExtractor, BaseNode, Document, IngestionPipeline, type NodeParser } from 'llamaindex';

type LlamaindexIndexPipeline = (document: Document) => Promise<BaseNode[]>;

export function createIndexIngestionPipeline (
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
  return wrapLlamaindexIndexPipeline((document) => {
    return pipeline.run({
      documents: [document],
      inPlace: true,
    });
  });
}

function wrapLlamaindexIndexPipeline (f: LlamaindexIndexPipeline): (content: rag.Content<any>) => Promise<rag.EmbeddedContent<any, any>> {
  return async (content) => {
    const node = contentToNode(content);
    const nodes = await f(node);
    const chunkedContent: rag.EmbeddedContent<any, any> = nodeToContent(node) as any;
    chunkedContent.chunks = nodes.map(nodeToChunk);
    return chunkedContent;
  };
}
