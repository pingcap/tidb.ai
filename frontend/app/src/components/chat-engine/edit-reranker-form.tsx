'use client';

import { type ChatEngine, updateChatEngine } from '@/api/chat-engines';
import { EditPropertyForm } from '@/components/chat-engine/edit-property-form';
import { RerankerSelect } from '@/components/form/biz';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.number().nullable();

export interface EditRerankerFormProps {
  chatEngine: ChatEngine;
}

export function EditRerankerForm ({ chatEngine }: EditRerankerFormProps) {
  const router = useRouter();
  const [transitioning, startTransition] = useTransition();

  return (
    <>
      <EditPropertyForm
        object={chatEngine}
        property="reranker_id"
        schema={schema}
        onSubmit={async data => {
          await updateChatEngine(chatEngine.id, data);
          startTransition(() => {
            router.refresh();
          });
          toast(`ChatEngine successfully updated.`);
        }}
        inline
        disabled={transitioning}
      >
        <RerankerSelect reverse={false} />
      </EditPropertyForm>
    </>
  );
}