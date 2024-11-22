import { getDefaultChatEngineOptions } from '@/api/chat-engines';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { CreateChatEngineForm } from '@/components/chat-engine/create-chat-engine-form';

export default async function NewChatEnginePage () {
  const defaultOptions = await getDefaultChatEngineOptions();
  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Chat Engines', url: '/chat-engines' },
          { title: 'New' },
        ]}
      />
      <CreateChatEngineForm defaultChatEngineOptions={defaultOptions} />
    </>
  );
}
