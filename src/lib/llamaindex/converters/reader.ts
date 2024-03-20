import { Flow } from '@/core';
import { rag } from '@/core/interface';
import { contentToNode } from '@/lib/llamaindex/converters/base';
import { type BaseReader, type Document } from 'llamaindex';

export interface AppReader extends BaseReader {
  loadData (buffer: Buffer, mime: string, uri: string): Promise<Document[]>;
}

export function fromFlowReaders (flow: Flow) {
  return new FlowReaders(flow);
}

class FlowReaders implements AppReader {
  constructor (private flow: Flow) {}

  async loadData (buffer: Buffer, mime: string, uri: string): Promise<Document[]> {
    const loader: rag.Loader<any, any> = this.flow.getLoader(mime, uri);
    const content = await loader.load(buffer, uri);

    return Promise.resolve([contentToNode(content)]);
  }

}
