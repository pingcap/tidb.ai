import {toggleProvider} from "@/core/v1/auth";
import { adminHandlerGuard } from '@/lib/auth-server';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

export const POST = adminHandlerGuard(async (req, { params }: { params: { name: string, action: string } }) => {
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
});