import { baseRegistry } from '@/rag-spec/base';
import { zodResolver } from '@hookform/resolvers/zod';
import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest, { params }: { params: { identifier: string } }) {
  const identifier = decodeURIComponent(params.identifier);
  const ctor = baseRegistry.getComponent(identifier);
  if (!ctor) {
    notFound();
  }

  const resolver = zodResolver(ctor.optionsSchema);
  const args: [any, any, any] = await req.json();
  const result = await resolver(...args);

  return NextResponse.json(result);
}

export const dynamic = 'force-dynamic';
