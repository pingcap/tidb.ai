import { type Chat, type ChatMessage, getChat } from '@/api/chats';
import { Conversation } from '@/components/chat/conversation';
import { ErrorCard } from '@/components/error-card';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { isServerError } from '@/lib/request';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const cachedGetChat = cache((id: string) => getChat(id)
  .then(res => {
    return res;
  })
  .catch(error => {
    if (isServerError(error, [404, 422 /* handle not UUID */])) {
      notFound();
    } else {
      return Promise.reject(error);
    }
  }));

export default async function ChatDetailPage ({ params }: { params: { id: string } }) {
  const id = params.id;

  const me = await auth();

  let chat: Chat | undefined;
  let messages: ChatMessage[];

  if (id === 'new') {
    messages = [];
  } else {
    try {

      const detail = await cachedGetChat(id);

      chat = detail.chat;
      messages = detail.messages;
    } catch (error) {
      if (isServerError(error, 403)) {
        return (
          <div className="h-screen flex items-center justify-center xl:pr-side bg-accent">
            <ErrorCard
              title="Access denied"
              message="This chat is private"
            >
              <div className="flex gap-2 items-center mt-8">
                {!me && (
                  <Button asChild>
                    <Link href="/auth/login">
                      Login to continue
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" asChild>
                  <Link href="/">
                    Back to homepage
                  </Link>
                </Button>
              </div>
            </ErrorCard>
          </div>
        );
      }
      throw error;
    }
  }

  return (
    <div className="xl:pr-side">
      <Conversation
        open={!!me && me.id === chat?.user_id}
        chat={chat}
        history={messages}
      />
    </div>
  );
}

export async function generateMetadata ({ params }: { params: { id: string } }): Promise<Metadata> {
  if (params.id === 'new') {
    return {
      title: 'Creating chat... | tidb.ai',
    };
  }
  try {
    const chat = await cachedGetChat(params.id);

    return {
      title: chat.chat.title,
    };
  } catch (error) {
    if (isServerError(error, 403)) {
      return {};
    } else {
      throw error;
    }
  }
}

export const dynamic = 'force-dynamic';
