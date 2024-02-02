import { rag } from '@/core/interface';
import { md5 } from '@/lib/digest';

export namespace TextLoader {
  export interface Options {
    encoding?: BufferEncoding;
  }
}

export class TextLoader extends rag.Loader<TextLoader.Options, {}> {
  static identifier = 'rag.loader.text';
  static displayName = 'Text loader';

  async load (buffer: Buffer) {
    const content = buffer.toString(this.options.encoding ?? 'utf8');
    return {
      content: [content],
      digest: md5(content),
      metadata: {
      },
    } satisfies rag.Content<{}>;
  }

  support (mime: string): boolean {
    return /text/.test(mime);
  }
}
