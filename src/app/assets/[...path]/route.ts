import type { RouteProps } from '@/lib/next/types';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import mime from 'mime';
import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest, { params }: RouteProps<{ path: string[] }>) {
  const flow = await getFlow(baseRegistry);
  const storage = flow.getStorage('rag.document-storage.fs');

  if (!storage.available()) {
    notFound();
  }

  const name = params.path.join('/');

  try {
    const buffer = await storage.get(name);
    const contentType = mime.getType(name);

    return new NextResponse(buffer, {
      headers: contentType ? { 'Content-Type': contentType } : {},
    });
  } catch (e) {
    notFound();
  }
}

export const dynamic = 'force-static';
