import { rag } from '@/core/interface';
import { Unzip, UnzipInflate } from 'fflate';
import * as https from 'https';
import mime from 'mime';

const REGEXP = /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/tree\/([^/]+))?$/;

export class GithubRepoUriLoader implements rag.IUriLoader {
  private storage: rag.DocumentStorage<any>;

  constructor (storage: rag.DocumentStorage<any>) {
    this.storage = storage;
  }

  support (uri: string): boolean {
    return REGEXP.test(uri);
  }

  async load (uri: string): Promise<rag.RawContent[]> {
    const [_, owner, repo, branch = 'main'] = REGEXP.exec(uri)!;

    return await this.fetch(owner, repo, branch);
  }

  private async fetch (owner: string, repo: string, branch: string) {
    const url = `https://codeload.github.com/${owner}/${repo}/zip/refs/heads/${branch}`;

    const promises: Promise<rag.RawContent[]>[] = [];

    const unzipStream = new Unzip((chunk) => {
      promises.push(new Promise(async (resolve, reject) => {
        const name = chunk.name.replace(/^\//, '').slice(chunk.name.replace(/^\//, '').indexOf('/') + 1);

        if (!name) {
          resolve([]);
          return;
        }

        if (name.endsWith('/')) {
          resolve([]);
          return;
        }

        const buffers: Uint8Array[] = [];

        chunk.ondata = (err, content, isFinal) => {
          if (err) {
            reject(err);
            chunk.terminate();
          }
          buffers.push(content);
          const writePromise = this.storage.put(name, Buffer.concat(buffers), true);
          if (isFinal) {
            writePromise.then(tmpUri => {
              resolve([{
                storage: this.storage.identifier,
                sourceUri: `https://github.com/${owner}/${repo}/blob/${branch}/${name.replace(/^\//, '')}`,
                uri: tmpUri,
                mime: mime.getType(name) ?? undefined,
              }]);
            });
          }
        };

        if (/\.(?:jpe?g|png|webp|gif|mp[34]|mov)$/.test(name)) {
          resolve([]);
          return;
        }

        chunk.start();
      }));
    });

    unzipStream.register(class _ extends UnzipInflate {
      constructor (filename: string) {
        super();
      }
    });

    const read = new Promise<void>((resolve, reject) => {
      https.get(url, res => {
        res.on('data', chunk => {
          unzipStream.push(chunk);
        });
        res.on('end', () => {
          unzipStream.push(new Uint8Array(), true);
          resolve();
        });
        res.on('error', err => {
          reject(err);
        });
      });
    });

    await read;
    const files = await Promise.all(promises);

    return files.flatMap(f => f);
  }
}