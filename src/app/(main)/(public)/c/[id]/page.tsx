import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Conversation } from '@/components/conversation';
import database from '@/core/db';
import { cache } from 'react';

const getChat = cache(async (id: string) => {
  const [
    chat,
    history,
    context,
  ] = await Promise.all([
    database.chat.getChat(id),
    database.chat.getHistory(id),
    database.chat.getContext(id),
  ]);

  return { chat, history, context };
});

export default async function Conversations ({ params }: { params: { id: string } }) {
  const session = await auth();
  const user = session?.user;

  const id = decodeURIComponent(params.id);

  const {
    chat,
    history,
    context,
  } = await getChat(id);

  return (
    <div className="xl:pr-side">
      <Conversation history={history} context={context} open={!!chat && !!user && chat.created_by === user.id} />
    </div>
  );
}

export async function generateMetadata ({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);

  const {
    chat,
    history,
    context,
  } = await getChat(id);

  const first = history?.find(item => item.role === 'assistant')?.content;

  return {
    title: chat?.name ?? undefined,
    description: first,
  };
}
