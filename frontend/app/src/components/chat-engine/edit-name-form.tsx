'use client';

import { type ChatEngine, updateChatEngine } from '@/api/chat-engines';
import { EditPropertyForm } from '@/components/chat-engine/edit-property-form';
import { FormInput } from '@/components/form/control-widget';
import { useRefresh } from '@/components/nextjs/app-router-hooks';
import { toast } from 'sonner';
import { z } from 'zod';

export interface EditNameFormProps {
  chatEngine: ChatEngine;
}

const stringSchema = z.string();

export function EditNameForm ({ chatEngine }: EditNameFormProps) {
  const [refreshing, refresh] = useRefresh();

  return (
    <EditPropertyForm
      inline
      object={chatEngine}
      property="name"
      schema={stringSchema}
      onSubmit={async (data) => {
        await updateChatEngine(chatEngine.id, data);
        refresh();
        toast('ChatEngine\'s name successfully updated.');
      }}
      disabled={refreshing}
    >
      <FormInput />
    </EditPropertyForm>
  );
}
