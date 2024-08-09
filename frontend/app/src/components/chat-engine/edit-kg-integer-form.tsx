'use client';

import { type ChatEngine, type ChatEngineOptions, updateChatEngine } from '@/api/chat-engines';
import { EditPropertyForm } from '@/components/chat-engine/edit-property-form';
import { FormInput } from '@/components/form/control-widget';
import { useRefresh } from '@/components/nextjs/app-router-hooks';
import { toast } from 'sonner';
import { z } from 'zod';

const booleanSchema = z.coerce.number().int();

type KeyOfType<T, Value> = keyof { [P in keyof T as T[P] extends Value ? P : never]: any }

export interface EditIntegerFormProps {
  chatEngine: ChatEngine;
  type: KeyOfType<ChatEngine['engine_options']['knowledge_graph'], number>;
}

export function EditKgIntegerForm ({ type, chatEngine }: EditIntegerFormProps) {
  const [refreshing, refresh] = useRefresh();

  return (
    <>
      <EditPropertyForm
        inline
        object={chatEngine.engine_options.knowledge_graph}
        property={type}
        schema={booleanSchema}
        onSubmit={async (data) => {
          const options: ChatEngineOptions = {
            knowledge_graph: {
              ...chatEngine.engine_options.knowledge_graph,
              ...data,
            },
            llm: { ...chatEngine.engine_options.llm },
          };
          await updateChatEngine(chatEngine.id, {
            engine_options: options,
          });
          refresh();
          toast('ChatEngine successfully updated.');
        }}
        disabled={refreshing}
      >
        <FormInput type="number" min={0} step={1} />
      </EditPropertyForm>
    </>
  );
}
