import { rag } from '@/core/interface';
import { md5 } from '@/lib/digest';
import pdfLoaderMeta, { type PdfLoaderOptions } from './meta';

export default class PdfLoader extends rag.Loader<PdfLoaderOptions, {}> {
  async load (buffer: Buffer) {
    const Pdf = await import('pdfjs-dist/build/pdf.mjs');
    await import('pdfjs-dist/build/pdf.worker.mjs');

    const document = await Pdf.getDocument(buffer.buffer).promise;
    let content: string = '';

    for (let i = 1; i <= document.numPages; i++) {
      const page = await document.getPage(i);
      const textContent = await page.getTextContent();

      for (let item of textContent.items) {
        if ('str' in item) {
          content += item.str;
          if (item.hasEOL) {
            content += '\n';
          }
        }
      }
    }

    return {
      content: [content],
      hash: md5(buffer),
      metadata: {},
    };
  }

  support (mime: string): boolean {
    return mime === 'application/pdf';
  }
}

Object.assign(PdfLoader, pdfLoaderMeta);
