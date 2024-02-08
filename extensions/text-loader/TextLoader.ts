import { rag } from '@/core/interface';
import { md5 } from '@/lib/digest';
import textLoaderMeta, { type TextLoaderOptions } from './meta';

export default class TextLoader extends rag.Loader<TextLoaderOptions, {}> {
  async load (buffer: Buffer) {
    const content = buffer.toString(this.options.encoding ?? 'utf8');
    return {
      content: [content],
      digest: md5(content),
      metadata: {},
    } satisfies rag.Content<{}>;
  }

  support (mime: string): boolean {
    return /text/.test(mime);
  }
}

Object.assign(TextLoader, textLoaderMeta);
