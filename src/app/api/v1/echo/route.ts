import { PdfLoader } from '@/rag-spec/loaders/PdfLoader';
import { SitemapXmlTaskProcessor } from '@/rag-spec/task-processor/SitemapXmlTaskProcessor';
import * as fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET () {
  const loader = new PdfLoader({});


  return NextResponse.json(await loader.load(fs.readFileSync('.store/blob/D0/Ibk5PFFI0W')));
}

export const dynamic = 'force-dynamic';
