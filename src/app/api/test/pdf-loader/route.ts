import { type NextRequest, NextResponse } from 'next/server';
import PdfLoader from '../../../../../extensions/pdf-loader/PdfLoader';

export async function POST (req: NextRequest) {
  const pdfLoader = new PdfLoader({});
  const form = await req.formData();
  const file = form.get('file') as File;
  return NextResponse.json(await pdfLoader.load(Buffer.from(await file.arrayBuffer())));
}