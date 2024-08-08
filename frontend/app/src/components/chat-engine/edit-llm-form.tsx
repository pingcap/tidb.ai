'use client';

import { type ChatEngine, updateChatEngine } from '@/api/chat-engines';
import { EditPropertyForm } from '@/components/chat-engine/edit-property-form';
import { LLMSelect } from '@/components/form/biz';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.number().nullable();

export interface EditLlmFormProps {
  chatEngine: ChatEngine;
  type: 'llm_id' | 'fast_llm_id';
}

export function EditLlmForm ({ type, chatEngine }: EditLlmFormProps) {
  const router = useRouter();
  const [transitioning, startTransition] = useTransition();

  return (
    <>
      <EditPropertyForm
        object={chatEngine}
        property={type}
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
        <LLMSelect reverse={false} />
      </EditPropertyForm>
    </>
  );
}