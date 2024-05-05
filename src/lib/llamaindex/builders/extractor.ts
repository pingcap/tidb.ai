import { Flow } from '@/core';
import { rag } from '@/core/interface';
import { nodeToChunk, nodeToContent } from '@/lib/llamaindex/builders/base';
import { BaseExtractor, type BaseNode, KeywordExtractor, QuestionsAnsweredExtractor, SummaryExtractor, TitleExtractor } from 'llamaindex';

export function getMetadataExtractor (flow: Flow, name: string, options: any) {
  switch (name) {
    case 'llamaindex.extractor.title':
      return new TitleExtractor(options);
    case 'llamaindex.extractor.summary':
      return new SummaryExtractor(options);
    case 'llamaindex.extractor.keyword':
      return new KeywordExtractor(options);
    case 'llamaindex.extractor.question-answered':
      return new QuestionsAnsweredExtractor(options);
  }

  const extractor = flow.get(rag.ExtensionType.ContentMetadataExtractor, name);
  if (extractor) {
    return fromContentMetadataExtractor(extractor.withOptions(options));
  } else {
    const extractor = flow.get(rag.ExtensionType.ContentChunkMetadataExtractor, name);
    if (extractor) {
      return fromContentChunkMetadataExtractor(extractor.withOptions(options));
    }
  }

  throw new Error(`unknown extractor ${name}`);
}

export function fromContentMetadataExtractor (impl: rag.ContentMetadataExtractor<any>): BaseExtractor {
  return new RagContentMetadataExtractor(impl);
}

export function fromContentChunkMetadataExtractor (impl: rag.ContentChunkMetadataExtractor<any>): BaseExtractor {
  return new RagContentChunkMetadataExtractor(impl);
}

class RagContentMetadataExtractor extends BaseExtractor {
  constructor (private impl: rag.ContentMetadataExtractor<any>) {super();}

  async extract (nodes: BaseNode<any>[]): Promise<Record<string, any>[]> {
    const contents = nodes.map(node => nodeToContent(node));

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
