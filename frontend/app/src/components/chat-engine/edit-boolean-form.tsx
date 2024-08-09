'use client';

import { type ChatEngine, updateChatEngine } from '@/api/chat-engines';
import { EditPropertyForm } from '@/components/chat-engine/edit-property-form';
import { FormSwitch } from '@/components/form/control-widget';
import { useRefresh } from '@/components/nextjs/app-router-hooks';
import { toast } from 'sonner';
import { z } from 'zod';

const booleanSchema = z.boolean();

type KeyOfType<T, Value> = keyof { [P in keyof T as T[P] extends Value ? P : never]: any }

export interface EditBooleanFormProps {
  chatEngine: ChatEngine;
  type: KeyOfType<ChatEngine, boolean>;
}

export function EditBooleanForm ({ type, chatEngine }: EditBooleanFormProps) {
  const [refreshing, refresh] = useRefresh();

  return (
    <>
      <EditPropertyForm
        inline
        object={chatEngine}
        property={type}
        schema={booleanSchema}
        onSubmit={async (data) => {
          await updateChatEngine(chatEngine.id, data);
          refresh();
          toast('ChatEngine successfully updated.');
        }}
        disabled={refreshing}
      >
        <FormSwitch />
      </EditPropertyForm>
    </>
  );
}
