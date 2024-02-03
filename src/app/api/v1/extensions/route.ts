import { baseRegistry } from '@/rag-spec/base';
import { NextResponse } from 'next/server';

export async function GET () {
  return NextResponse.json(baseRegistry.list());
}
