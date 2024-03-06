import { removeProvider, updateProvider } from '@/core/db/auth';
import { adminHandlerGuard } from '@/lib/auth-server';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

export const PUT = adminHandlerGuard(async (req, { params }: { params: { name: string } }) => {
  const name = decodeURIComponent(params.name);

  const config = await req.json();

  if (!await updateProvider(name, config)) {
    notFound();
  }

  return new NextResponse();
});

export const DELETE = adminHandlerGuard(async (req, { params }: { params: { name: string } }) => {
  const name = decodeURIComponent(params.name);

  if (!await removeProvider(name)) {
    notFound();
  }

  return new NextResponse();
});
