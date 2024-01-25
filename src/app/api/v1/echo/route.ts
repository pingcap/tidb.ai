import { VercelBlobDocumentStorage } from '@/rag-spec/doument-storage/VercelBlobDocumentStorage';
import { NextResponse } from 'next/server';

export async function GET () {
  const blob = new VercelBlobDocumentStorage(VercelBlobDocumentStorage.optionsSchema.parse({}));

  console.log('yo')

  return NextResponse.json(blob.options);
}

export const dynamic = 'force-dynamic';
