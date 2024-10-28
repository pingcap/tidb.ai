import { getChatMessageRecommendQuestions } from '@/api/chats';
import { useChatMessageField, useChatMessageStreamState, useCurrentChatController } from '@/components/chat/chat-hooks';
import type { ChatMessageController } from '@/components/chat/chat-message-controller';
import { isNotFinished } from '@/components/chat/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import useSWR from 'swr';

export function MessageRecommendQuestions ({ assistant }: { assistant: ChatMessageController | undefined }) {
  const state = useChatMessageStreamState(assistant);
  const finishedAt = useChatMessageField(assistant, 'finished_at');
  const shouldPerformRequest = !isNotFinished(state) && !!finishedAt;
  const { data, isLoading } = useSWR(assistant && shouldPerformRequest && `chat.messages.${assistant.id}.recommend-questions`, () => getChatMessageRecommendQuestions(assistant!.id), { revalidateOnFocus: false });
  const controller = useCurrentChatController();

  if (!shouldPerformRequest) {
    return null;
  }

  return (
    <>
      <hr />
      <section className="space-y-2">
        <div className={cn('font-normal text-lg flex items-center gap-2 transition-opacity opacity-100')}>
          Further questions
        </div>
        <ul className="">
          {isLoading && ['w-[70%]', 'w-[30%]', 'w-[50%]'].map(i => (
            <li key={i} className="last-of-type:border-b-0 border-b py-2 text-sm cursor-pointer transition-colors text-muted-foreground">
              <Skeleton className={cn('bg-muted h-3 py-0.5 w-60', i)} />
            </li>
          ))}
          {data?.map((q, i) => (
            <li key={i} className="text-sm last-of-type:border-b-0 border-b py-2">
              <button className="relative text-left pr-8 cursor-pointer transition-colors text-muted-foreground hover:text-foreground" onClick={() => {
                void controller.post({
                  content: q,
                });
              }}>
                {q}
                <PlusIcon className='absolute stroke-2 size-4 right-2 top-1/2 -translate-y-1/2' />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}