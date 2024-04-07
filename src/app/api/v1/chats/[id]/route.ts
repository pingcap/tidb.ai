import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { deleteChat, getChat } from '@/core/v1/chat';
import { NextResponse } from 'next/server';

export const DELETE = auth(async (req, { params }: { params: { id: string } }) => {
  const user = req.auth?.user;
  if (!user?.id) {
    return new NextResponse(null, { status: 401 });
  }

  const id = parseInt(decodeURIComponent(params.id));
  const chat = await getChat(id);

  if (!chat) {
    return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
  }

  // Non admin user can only delete chats created by same user.
  if (user.role !== 'admin') {
    if (chat.created_by !== user.id) {
      return new NextResponse(null, { status: 403 });
    }
  }

  await deleteChat(id, user.id);

  return new NextResponse(null, { status: 204 });
});

export const dynamic = 'force-dynamic';