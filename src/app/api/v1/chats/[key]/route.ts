import { deleteChat, getChatByUrlKey } from '@/core/repositories/chat';
import { defineHandler } from '@/lib/next/handler';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const paramsSchema = z.object({
  key: z.string(),
});

export const GET = defineHandler({
  auth: 'anonymous',
  params: paramsSchema,
}, async ({ params: { key } }) => {
  return await getChatByUrlKey(key);
});

export const DELETE = defineHandler({
  auth: 'user',
  params: paramsSchema,
}, async ({ auth, params: { key } }) => {
  const user = auth.user;
  const chat = await getChatByUrlKey(key);

  if (!chat) {
    return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
  }

  // Non-admin user can only delete chats created by himself.
  if (user.role !== 'admin') {
    if (chat.created_by !== user.id) {
      return new NextResponse(null, { status: 403 });
    }
  }

  await deleteChat(key, user.id || 'unknown');

  return new NextResponse(null, { status: 204 });
});

export const dynamic = 'force-dynamic';