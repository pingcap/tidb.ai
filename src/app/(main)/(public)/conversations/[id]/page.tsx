import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Conversation } from '@/components/conversation';
import database from '@/core/db';

export default async function Conversations ({ params }: { params: { id: string } }) {
  const session = await auth();
  const user = session?.user;

  const id = decodeURIComponent(params.id);

  const [
    chat,
    history,
    context,
  ] = await Promise.all([
    database.chat.getChat(id),
    database.chat.getHistory(id),
    database.chat.getContext(id),
  ]);

  return (
    <div className='pr-side'>
      <Conversation history={history} context={context} open={!!chat && !!user && chat.created_by === user.id} />
    </div>
  );
}
