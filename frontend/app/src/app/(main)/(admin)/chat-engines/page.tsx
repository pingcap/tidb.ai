import { AdminPageHeading } from '@/components/admin-page-heading';
import { ChatEnginesTable } from '@/components/chat-engine/chat-engines-table';

export default function ChatEnginesPage () {
  return (
    <>
      <AdminPageHeading title="Chat Engines" />
      <ChatEnginesTable />
    </>
  );
}
