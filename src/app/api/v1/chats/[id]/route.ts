import { auth } from '@/app/api/auth/[...nextauth]/auth';
import db from '@/core/db';
import { NextResponse } from 'next/server';

export const DELETE = auth(async (req, { params }: { params: { id: string } }) => {
  const user = req.auth?.user;
  if (!user?.id) {
    return new NextResponse(null, { status: 401 });
  }

  const id = decodeURIComponent(params.id);
  const chat = await db.chat.getChat(id);

  if (!chat) {
    return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
  }

  // Non admin user can only delete chats created by same user.
  if (user.role !== 'admin') {
    if (chat.created_by !== user.id) {
      return new NextResponse(null, { status: 403 });
    }
  }

  await db.chat.deleteChat(id, user.id);

  return new NextResponse(null, { status: 204 });
});

export const dynamic = 'force-dynamic';