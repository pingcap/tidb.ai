import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Conversation } from '@/components/chat/conversation';
import { getChat as getChat_, getChatByUrlKey, listChatContexts, listChatMessages } from '@/core/repositories/chat';
import type { ChatEngineOptions } from '@/core/repositories/chat_engine';
import { notFound, redirect } from 'next/navigation';
import { cache } from 'react';

const getChat = cache(async (key: string) => {
  if (/^\d+$/.test(key)) {
    const chat = await getChat_(parseInt(key));
    if (!chat) {
      notFound();
    }
    redirect(`/c/${chat.url_key}`);
  }

  const chat = await getChatByUrlKey(key);
  if (!chat) {
    notFound();
  }
  const [
    history,
    context,
  ] = await Promise.all([
    listChatMessages(chat.id),
    listChatContexts(chat.id),
  ]);

  return { chat, history, context: context.map((item, index) => ({ ordinal: item.ordinal, title: item.name, uri: item.source_uri })) };
});

export default async function Conversations ({ params }: { params: { id: string } }) {
  const session = await auth();
  const user = session?.user;

  const {
    chat,
    history,
    context,
  } = await getChat(decodeURIComponent(params.id));

  return (
    <div className="xl:pr-side">
      <Conversation history={history} context={context} open={!!chat && !!user && chat.created_by === user.id} engineOptions={chat.engine_options as ChatEngineOptions | null} />
    </div>
  );
}

export async function generateMetadata ({ params }: { params: { id: string } }) {
  const id = parseInt(decodeURIComponent(params.id));

  const {
    chat,
    history,
    context,
  } = await getChat(decodeURIComponent(params.id));

  const first = history?.find(item => item.role === 'assistant')?.content;

  return {
    title: chat?.title ?? undefined,
    description: first,
  };
}
