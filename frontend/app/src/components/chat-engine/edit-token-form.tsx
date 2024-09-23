'use client';

import { type ChatEngine, type ChatEngineOptions, updateChatEngine } from '@/api/chat-engines';
import { EditPropertyForm } from '@/components/chat-engine/edit-property-form';
import { FormInput } from '@/components/form/control-widget';
import { useRefresh } from '@/components/nextjs/app-router-hooks';
import { toast } from 'sonner';
import { z } from 'zod';

type KeyOfType<T, Value> = keyof { [P in keyof T as T[P] extends Value ? P : never]: any }

export interface EditNameFormProps<P extends KeyOfType<ChatEngineOptions, string | undefined | null>> {
  property: P;
  chatEngine: ChatEngine;
}

const stringSchema = z.string();

export function EditTokenForm<P extends KeyOfType<ChatEngineOptions, string | undefined | null>> ({ property, chatEngine }: EditNameFormProps<P>) {
  const [refreshing, refresh] = useRefresh();

  return (
    <EditPropertyForm
      inline
      object={chatEngine.engine_options}
      property={property}
      schema={stringSchema}
      onSubmit={async (data) => {
        const options = { ...chatEngine.engine_options, ...data };
        await updateChatEngine(chatEngine.id, { engine_options: options });
        refresh();
        toast(`ChatEngine's ${property} successfully updated.`);
      }}
      disabled={refreshing}
    >
      <FormInput type="password" />
    </EditPropertyForm>
  );
}
