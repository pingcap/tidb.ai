import { rag } from '@/core/interface';
import { env } from '@/lib/zod-extensions';
import * as blob from '@vercel/blob';
import path from 'node:path';
import { z } from 'zod';

export namespace VercelBlobDocumentStorage {
  export interface Options {
    token?: string;
    prefix?: string;
  }
}

export class VercelBlobDocumentStorage extends rag.DocumentStorage<VercelBlobDocumentStorage.Options> {
  static identifier = 'rag.document-storage.vercel-blob';
  static displayName = 'Vercel Blob';
  static optionsSchema = z.object({
    token: env('VERCEL_BLOB_STORAGE_TOKEN'),
    prefix: env('VERCEL_BLOB_STORAGE_PREFIX').optional(),
  });

  private readonly host: string;

  constructor (options: VercelBlobDocumentStorage.Options) {
    super(options);

    // not sure
    const BLOB_DOMAIN_KEY = options.token?.replace(/^vercel_blob_rw_([^_]+)_.+$/, (_, s: string) => s) ?? '........';
    this.host = `https://${BLOB_DOMAIN_KEY}.public.blob.vercel-storage.com`;
  }

  private getName (name: string, tmp: boolean = false) {
    if (tmp) {
      return path.join('tmp', name);
    }
    if (!this.options.prefix) {
      return name;
    }
    return path.join(this.options.prefix, name);
  }

  private getUrl (name: string) {
    return this.host + '/' + this.getName(name, false);
  }

  available (): boolean {
    return !!this.options.token;
  }

  async delete (path: string): Promise<boolean> {
    try {
      await blob.head(this.getUrl(path), { token: this.options.token });
      await blob.del([this.getUrl(path)], { token: this.options.token });

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
    await blob.put(this.getName(path, tmp), buffer, { token: this.options.token, access: 'public', addRandomSuffix: false });
    return Promise.resolve(this.getUrl(pathname));
  }
}