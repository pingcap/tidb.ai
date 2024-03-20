import { Flow } from '@/core';
import type { DBDocument } from '@/core/db/document';
import { rag } from '@/core/interface';
import { contentToNode } from '@/lib/llamaindex/converters/base';
import { type BaseReader, type Document } from 'llamaindex';

export interface AppReader extends BaseReader {
  loadData (dbDocument: DBDocument): Promise<Document[]>;
}

export function fromFlowReaders (flow: Flow) {
  return new FlowReaders(flow);
}

class FlowReaders implements AppReader {
  constructor (private flow: Flow) {}

  async loadData ({ mime, content_uri, source_uri }: DBDocument): Promise<Document[]> {
    const loader: rag.Loader<any, any> = this.flow.getLoader(mime, source_uri);
    const buffer = await this.flow.getStorage().get(content_uri);
    const content = await loader.load(buffer, source_uri);

    return Promise.resolve([contentToNode(content)]);
  }

}
