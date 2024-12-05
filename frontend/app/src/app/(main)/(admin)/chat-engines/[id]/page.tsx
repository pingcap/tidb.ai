import { getChatEngine, getDefaultChatEngineOptions } from '@/api/chat-engines';
import { getBootstrapStatus } from '@/api/system';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { UpdateChatEngineForm } from '@/components/chat-engine/update-chat-engine-form';

export default async function ChatEnginePage ({ params }: { params: { id: string } }) {
  const [chatEngine, defaultChatEngineOptions, bootstrapStatus] = await Promise.all([
    getChatEngine(parseInt(params.id)),
    getDefaultChatEngineOptions(),
    getBootstrapStatus(),
  ]);

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Chat Engines', docsUrl: '/docs/chat-engine', url: '/chat-engines' },
          {
            title: chatEngine.name,
            alert: bootstrapStatus.need_migration.chat_engines_without_kb_configured?.includes(chatEngine.id) ? {
              variant: 'warning',
              content: 'KnowledgeBase not configured',
            } : undefined,
          },
        ]}
      />
      <UpdateChatEngineForm chatEngine={chatEngine} defaultChatEngineOptions={defaultChatEngineOptions} />
    </>
  );
}
