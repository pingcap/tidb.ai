import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Conversation } from '@/components/conversation';
import database from '@/core/db';
import { getChat as dbGetChat, listChatContexts, listChatMessages } from '@/core/v1/chat';
import { cache } from 'react';

const getChat = cache(async (id: number) => {
  const [
    chat,
    history,
    context,
  ] = await Promise.all([
    dbGetChat(id),
    listChatMessages(id),
    listChatContexts(id),
  ]);

  return { chat, history, context: context.map((item, index) => ({ ordinal: item.ordinal, title: item.name, uri: item.source_uri })) };
});

export default async function Conversations ({ params }: { params: { id: string } }) {
  const session = await auth();
  const user = session?.user;

  const id = parseInt(decodeURIComponent(params.id));

  const {
    chat,
    history,
    context,
  } = await getChat(id);

  console.log(context)

  return (
    <div className="xl:pr-side">
      <Conversation history={history} context={context} open={!!chat && !!user && chat.created_by === user.id} />
    </div>
  );
}

export async function generateMetadata ({ params }: { params: { id: string } }) {
  const id = parseInt(decodeURIComponent(params.id));

  const {
    chat,
    history,
    context,
  } = await getChat(id);

  const first = history?.find(item => item.role === 'assistant')?.content;

  return {
    title: chat?.title ?? undefined,
    description: first,
  };
}
