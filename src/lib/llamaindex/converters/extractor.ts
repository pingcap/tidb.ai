import { rag } from '@/core/interface';
import { nodeToChunk, nodeToContent } from '@/lib/llamaindex/converters/base';
import { BaseExtractor, type BaseNode } from 'llamaindex';

export function fromContentMetadataExtractor (impl: rag.ContentMetadataExtractor<any>): BaseExtractor {
  return new RagContentMetadataExtractor(impl);
}

export function fromContentChunkMetadataExtractor (impl: rag.ContentChunkMetadataExtractor<any>): BaseExtractor {
  return new RagContentChunkMetadataExtractor(impl);
}

class RagContentMetadataExtractor extends BaseExtractor {
  constructor (private impl: rag.ContentMetadataExtractor<any>) {super();}

  async extract (nodes: BaseNode<any>[]): Promise<Record<string, any>[]> {
    const contents = nodes.map(nodeToContent);

    return await Promise.all(contents.map(async content => {
      const value = await this.impl.extract(content);
      return { [this.impl.metadataKey]: value };
    }));
  }
}

class RagContentChunkMetadataExtractor extends BaseExtractor {
  constructor (private impl: rag.ContentChunkMetadataExtractor<any>) {super();}

  async extract (nodes: BaseNode<any>[]): Promise<Record<string, any>[]> {
    const contents = nodes.map(nodeToChunk);

    return await Promise.all(contents.map(async chunk => {
      const value = await this.impl.extract(chunk);
      return { [this.impl.metadataKey]: value };
    }));
  }
}
