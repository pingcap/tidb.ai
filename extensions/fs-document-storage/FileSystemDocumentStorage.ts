import { rag } from '@/core/interface';
import * as fsp from 'fs/promises';
import path, { dirname, resolve } from 'node:path';
import * as os from 'os';
import fileSystemDocumentStorageMeta, { type FileSystemDocumentStorageOptions } from './meta';

export default class FileSystemDocumentStorage extends rag.DocumentStorage<FileSystemDocumentStorageOptions> {
  available (): boolean {
    return !/^\w+:/.test(this.options.path);
  }

  private resolve (filename: string) {
    return resolve(this.options.path, filename);
  }

  async delete (path: string) {
    try {
      await fsp.rm(this.resolve(path));
      return true;
    } catch {
      return false;
    }
  }

  async get (path: string) {
    return await fsp.readFile(this.resolve(path));
  }

  async put (name: string, stream: Body | Buffer, tmp = false) {
    const fn = tmp ? path.join(os.tmpdir(), name) : this.resolve(name);

    await fsp.mkdir(dirname(fn), { recursive: true });

    if (stream instanceof Buffer) {
      await fsp.writeFile(fn, stream);
    } else {
      const ab = await stream.arrayBuffer();
      const buffer = Buffer.from(ab);
      await fsp.writeFile(fn, buffer);
    }

    return fn;
  }
}

Object.assign(FileSystemDocumentStorage, fileSystemDocumentStorageMeta);
