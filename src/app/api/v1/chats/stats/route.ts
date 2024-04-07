import { getDb } from '@/core/v1/db';
import { NextResponse } from 'next/server';

export async function GET () {
  const stats = await getDb().selectFrom('chat_message')
    .leftJoin('chat', 'chat.id', 'chat_message.chat_id')
    .select([
      eb => eb.fn.count('chat.id').distinct().as('chats'),
      eb => eb.fn.count('chat_message.id').as('chat_messages'),
      eb => eb.fn.count('chat.created_by').distinct().as('sessions'),
    ])
    .where('role', '=', eb => eb.val('user'))
    .executeTakeFirstOrThrow();

  return NextResponse.json(stats);
}

export const dynamic = 'force-dynamic';
