import { toggleProvider } from '@/core/db/auth';
import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest, { params }: { params: { name: string, action: string } }) {
  const name = decodeURIComponent(params.name);
  const action = decodeURIComponent(params.action);

  let affected: boolean;
  switch (action) {
    case 'enable':
      affected = await toggleProvider(name, true);
      break;
    case 'disable':
      affected = await toggleProvider(name, false);
      break;
    default:
      notFound();
  }

  if (!affected) {
    notFound();
  }

  return new NextResponse();
}