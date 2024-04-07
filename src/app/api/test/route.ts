import { rag } from '@/core/interface';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { NextResponse } from 'next/server';

export async function GET () {

  const flow = await getFlow(baseRegistry);
  console.log(flow.list(rag.ExtensionType.DocumentStorage)[0].available())

  const storage = flow.getStorage();

  console.log(storage);
  return NextResponse.json({});
}

export const dynamic = 'force-dynamic';
