import { db } from '@/core/db/db';
import { NextResponse } from 'next/server';

export async function GET () {
  const stats = await db.selectFrom('chat_message')
    .select([
      eb => eb.fn.count('chat_id').distinct().as('chats'),
      eb => eb.fn.count('id').as('chat_messages'),
    ])
    .where('role', '=', eb => eb.val('user'))
    .executeTakeFirstOrThrow();

  return NextResponse.json(stats);
}

export const dynamic = 'force-dynamic';
