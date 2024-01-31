'use client';

import { __setMessage } from '@/app/(main)/(public)/conversations/[id]/internal';
import { MessageInput } from '@/components/message-input';
import { Button } from '@/components/ui/button';
import { handleErrors } from '@/lib/fetch';
import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';

export default function Page () {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [transitioning, startTransition] = useTransition();

  const handleStartChat = (message: string) => {
    startTransition(() => {
      setLoading(true);
      fetch('/api/v1/chats', {
        method: 'post',
        body: JSON.stringify({
          messages: [],
        }),
      }).then(handleErrors)
        .then(res => res.json())
        .then(res => {
          __setMessage(message);
          startTransition(() => {
            router.push(`/conversations/${encodeURIComponent(res.id)}`);
          });
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const disabled = loading || transitioning;

  return (
    <div className="h-content flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-semibold">
        Get Knowledge Here
      </h1>
      <form
        className="w-1/2"
        onSubmit={e => {
          const message = ref.current?.value ?? '';
          e.preventDefault();
          if (message.trim()) {
            handleStartChat(message);
          }
          return false;
        }}
      >
        <MessageInput className="w-full" disabled={disabled} inputRef={ref} />
      </form>

      <ul className="flex gap-2 flex-wrap max-w-[50%]">
        {prompts.map(item => (
          <li key={item}>
            <Button disabled={disabled} variant="secondary" size="sm" onClick={() => {
              handleStartChat(item);
            }}>
              {item}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const prompts = [
  'What is TiDB?',
  'Does TiDB support FOREIGN KEY?',
  'Does TiDB support serverless?',
];