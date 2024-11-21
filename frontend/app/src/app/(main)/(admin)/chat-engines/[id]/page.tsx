import { getChatEngine } from '@/api/chat-engines';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { ChatEngineDetails } from '@/components/chat-engine/chat-engine-details';
import { Card, CardContent } from '@/components/ui/card';

export default async function ChatEnginePage ({ params }: { params: { id: string } }) {
  const chatEngine = await getChatEngine(parseInt(params.id));

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Chat Engines', url: '/chat-engines' },
          { title: chatEngine.name },
        ]}
      />
      <div className="xl:pr-side max-w-screen-lg">
        <Card>
          <CardContent className="pt-4">
            <ChatEngineDetails chatEngine={chatEngine} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
