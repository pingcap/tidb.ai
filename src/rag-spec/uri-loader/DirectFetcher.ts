import { rag } from '@/core/interface';
import { genId } from '@/lib/id';
import mime from 'mime';
import path from 'node:path';

/**
 * @deprecated
 */
export class DirectFetcher implements rag.IUriLoader {
  private storage: rag.DocumentStorage<any>;

  constructor (storage: rag.DocumentStorage<any>) {
    this.storage = storage;
  }

  async load (uri: string): Promise<rag.RawContent[]> {
    const response = await fetch(uri);
    const type = response.headers.get('Content-Type');
    const mimeString = type ? type.split(';')[0].trim() : mime.getType(uri) ?? undefined;

    const name = uri.startsWith('data:') ? genId(32) : path.basename((new URL(uri)).pathname);

    const tmpUri = await this.storage.put(name, response, true);

    return [{
      storage: this.storage.identifier,
      sourceUri: uri,
      uri: tmpUri,
      mime: mimeString,
    }];
  }

  support (uri: string): boolean {
    return /^\w+:\//.test(uri);
  }
}