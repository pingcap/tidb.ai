import { AdminPageHeading } from '@/components/admin-page-heading';
import { ChatsTable } from '@/components/chat/chats-table';
import { requireAuth } from '@/lib/auth';

export default async function ConversationsListPage () {
  await requireAuth();

  return (
    <>
      <AdminPageHeading title="Conversations history" />
      <ChatsTable />
    </>
  );
}

export const dynamic = 'force-dynamic';
