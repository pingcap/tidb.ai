'use client';

import { type ChatEngine, updateChatEngine } from '@/api/chat-engines';
import { EditPropertyForm } from '@/components/chat-engine/edit-property-form';
import { RerankerSelect } from '@/components/form/biz';
import { useRefresh } from '@/components/nextjs/app-router-hooks';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.number().nullable();

export interface EditRerankerFormProps {
  chatEngine: ChatEngine;
}

export function EditRerankerForm ({ chatEngine }: EditRerankerFormProps) {
  const [refreshing, refresh] = useRefresh();

  return (
    <>
      <EditPropertyForm
        object={chatEngine}
        property="reranker_id"
        schema={schema}
        onSubmit={async data => {
          await updateChatEngine(chatEngine.id, data);
          refresh();
          toast(`ChatEngine successfully updated.`);
        }}
        inline
        disabled={refreshing}
      >
        <RerankerSelect reverse={false} />
      </EditPropertyForm>
    </>
  );
}