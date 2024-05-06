import { Flow } from '@/core';
import type { Document as CoreDocument } from '@/core/repositories/document';
import { rag } from '@/core/interface';
import { contentToNode } from '@/lib/llamaindex/converters/base';
import { type BaseReader, type Document } from 'llamaindex';

export interface AppReader extends BaseReader {
  loadData (dbDocument: Pick<CoreDocument, 'mime' | 'content_uri' | 'source_uri'>): Promise<Document[]>;
}

export function fromFlowReaders (flow: Flow, config: Record<string, any>) {
  return new FlowReaders(flow, config);
}

class FlowReaders implements AppReader {
  constructor (private flow: Flow, private config: Record<string, any>) {}

  async loadData ({ mime, content_uri, source_uri }: Pick<CoreDocument, 'mime' | 'content_uri' | 'source_uri'>): Promise<Document[]> {
    let loader: rag.Loader<any, any> = this.flow.getLoader(mime, source_uri);
    loader = loader.withOptions(this.config[loader.identifier] ?? loader.options);

    const buffer = await this.flow.getStorage().get(content_uri);
    const content = await loader.load(buffer, source_uri);

    return Promise.resolve([contentToNode(content)]);
  }

}
