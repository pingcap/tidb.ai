'use client';

import { type ChatEngine, updateChatEngine } from '@/api/chat-engines';
import { EditPropertyForm } from '@/components/chat-engine/edit-property-form';
import { LLMSelect } from '@/components/form/biz';
import { useRefresh } from '@/components/nextjs/app-router-hooks';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.number().nullable();

export interface EditLlmFormProps {
  chatEngine: ChatEngine;
  type: 'llm_id' | 'fast_llm_id';
}

export function EditLlmForm ({ type, chatEngine }: EditLlmFormProps) {
  const [refreshing, refresh] = useRefresh();

  return (
    <>
      <EditPropertyForm
        object={chatEngine}
        property={type}
        schema={schema}
        onSubmit={async data => {
          await updateChatEngine(chatEngine.id, data);
          refresh();
          toast(`ChatEngine successfully updated.`);
        }}
        inline
        disabled={refreshing}
      >
        <LLMSelect reverse={false} />
      </EditPropertyForm>
    </>
  );
}