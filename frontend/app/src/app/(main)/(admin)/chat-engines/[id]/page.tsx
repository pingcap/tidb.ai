import { getChatEngine, getDefaultChatEngineOptions } from '@/api/chat-engines';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { UpdateChatEngineForm } from '@/components/chat-engine/update-chat-engine-form';

export default async function ChatEnginePage ({ params }: { params: { id: string } }) {
  const [chatEngine, defaultChatEngineOptions] = await Promise.all([
    getChatEngine(parseInt(params.id)),
    getDefaultChatEngineOptions(),
  ]);

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Chat Engines', url: '/chat-engines' },
          { title: chatEngine.name },
        ]}
      />
      <UpdateChatEngineForm chatEngine={chatEngine} defaultChatEngineOptions={defaultChatEngineOptions} />
    </>
  );
}
