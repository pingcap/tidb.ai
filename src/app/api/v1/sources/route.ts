import database from '@/core/db';
import { NextResponse } from 'next/server';

export async function GET () {
  return NextResponse.json(await database.importSource.list());
}