import { rag } from '@/core/interface';
import { getOptionalEnv } from '@/lib/env';
import * as blob from '@vercel/blob';
import path from 'node:path';
import vercelBlobDocumentStorageMeta from './meta';

export namespace VercelBlobDocumentStorage {
  export interface Options {
    token?: string;
    prefix?: string;
  }
}

export default class VercelBlobDocumentStorage extends rag.DocumentStorage<VercelBlobDocumentStorage.Options> {
  private readonly host: string;
  private readonly token?: string;
  private readonly prefix: string;

  constructor (options: VercelBlobDocumentStorage.Options) {
    super(options);

    this.token = options.token ?? getOptionalEnv('BLOB_READ_WRITE_TOKEN');
    this.prefix = options.prefix ?? getOptionalEnv('VERCEL_BLOB_STORAGE_PREFIX') ?? '';

    // not sure
    const BLOB_DOMAIN_KEY = this.token?.replace(/^vercel_blob_rw_([^_]+)_.+$/, (_, s: string) => s) ?? '........';
    this.host = `https://${BLOB_DOMAIN_KEY}.public.blob.vercel-storage.com`;
  }

  private getName (name: string, tmp: boolean = false) {
    if (tmp) {
      return path.join('tmp', name);
    }
    if (!this.prefix) {
      return name;
    }
    return path.join(this.prefix, name);
  }

  private getUrl (name: string) {
    if (/^https?:\/\//.test(name)) {
      return name;
    }
    return this.host + '/' + this.getName(name, false);
  }

  available (): boolean {
    return !!this.token;
  }

  async delete (path: string): Promise<boolean> {
    try {
      await blob.head(this.getUrl(path), { token: this.token });
      await blob.del([this.getUrl(path)], { token: this.token });

      return true;
    } catch (e) {
      if (e instanceof blob.BlobNotFoundError) {
        return false;
      }
      throw e;
    }
  }

  async get (path: string) {
    const response = await fetch(this.getUrl(path));
    if (response.ok && !response.redirected) {
      return Buffer.from(await response.arrayBuffer());
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  }

  async put (path: string, stream: Body | Buffer, tmp = false) {
    const pathname = this.getName(path, tmp);
    let buffer: Buffer | ReadableStream<Uint8Array>;
    if (stream instanceof Buffer) {
      buffer = stream;
    } else {
      buffer = stream.body!;
    }
    await blob.put(this.getName(path, tmp), buffer, { token: this.token, access: 'public', addRandomSuffix: false });
    return Promise.resolve(this.getUrl(pathname));
  }
}

Object.assign(VercelBlobDocumentStorage, vercelBlobDocumentStorageMeta);