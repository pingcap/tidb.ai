'use client';

import { type ChatEngine, type ChatEngineOptions, updateChatEngine } from '@/api/chat-engines';
import { EditPropertyForm } from '@/components/chat-engine/edit-property-form';
import { FormSwitch } from '@/components/form/control-widget';
import { useRefresh } from '@/components/nextjs/app-router-hooks';
import { toast } from 'sonner';
import { z } from 'zod';

type KeyOfType<T, Value> = keyof { [P in keyof T as T[P] extends Value ? P : never]: any }

export interface EditOptionBooleanFormProps<P extends KeyOfType<ChatEngineOptions, boolean | undefined | null>> {
  property: P;
  chatEngine: ChatEngine;
}

const booleanSchema = z.boolean();

export function EditOptionBooleanForm<P extends KeyOfType<ChatEngineOptions, boolean | undefined | null>> ({ property, chatEngine }: EditOptionBooleanFormProps<P>) {
  const [refreshing, refresh] = useRefresh();

  return (
    <EditPropertyForm
      inline
      object={chatEngine.engine_options}
      property={property}
      schema={booleanSchema}
      onSubmit={async (data) => {
        const options = { ...chatEngine.engine_options, ...data };
        await updateChatEngine(chatEngine.id, { engine_options: options });
        refresh();
        toast(`ChatEngine's option ${property} successfully updated.`);
      }}
      disabled={refreshing}
    >
      <FormSwitch />
    </EditPropertyForm>
  );
}
