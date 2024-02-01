import { rag } from '@/core/interface';
import { md5 } from '@/lib/digest';

export class PdfLoader extends rag.Loader<{}, {}> {
  static identifier = 'rag.loader.pdf';
  static displayName = 'PDF loader';

  async load (buffer: Buffer) {
    const Pdf = await import('pdfjs-dist');

    const document = await Pdf.getDocument(buffer.buffer).promise;
    let content = '';

    for (let i = 1; i <= document.numPages; i++) {
      const page = await document.getPage(i);
      const textContent = await page.getTextContent();

      for (let item of textContent.items) {
        if ('str' in item) {
          content += item.str;
        }
      }

      content += '\n\n';
    }

    return {
      content,
      digest: md5(buffer),
      metadata: {
      },
    };
  }

  support (mime: string): boolean | Promise<boolean> {
    return mime === 'application/pdf';
  }
}