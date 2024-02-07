import { updateProvider } from '@/core/db/auth';
import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

export async function PUT (req: NextRequest, { params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);

  const config = await req.json();

  if (!await updateProvider(name, config)) {
    notFound();
  }

  return new NextResponse();
}