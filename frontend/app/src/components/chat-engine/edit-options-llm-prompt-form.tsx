'use client';

import { type ChatEngine, updateChatEngine } from '@/api/chat-engines';
import { EditPropertyForm } from '@/components/chat-engine/edit-property-form';
import { FormTextarea } from '@/components/form/control-widget';
import { useRefresh } from '@/components/nextjs/app-router-hooks';
import { toast } from 'sonner';
import { z } from 'zod';

export interface EditOptionsLlmPromptFormProps {
  chatEngine: ChatEngine;
  type: 'intent_graph_knowledge'
    | 'normal_graph_knowledge'
    | 'condense_question_prompt'
    | 'refine_prompt'
    | 'text_qa_prompt';
}

const schema = z.string().min(1);

export function EditOptionsLlmPromptForm ({ chatEngine, type }: EditOptionsLlmPromptFormProps) {
  const [refreshing, refresh] = useRefresh();

  return (
    <>
      <EditPropertyForm
        className="w-full"
        object={chatEngine.engine_options.llm}
        property={type}
        schema={schema}
        onSubmit={async data => {
          const chatEngineOptions = {
            ...chatEngine.engine_options,
            llm: {
              ...chatEngine.engine_options.llm,
              ...data,
            },
          };
          await updateChatEngine(chatEngine.id, { engine_options: chatEngineOptions });
          refresh();
          toast(`ChatEngine successfully updated.`);
        }}
        disabled={refreshing}
      >
        <FormTextarea className="min-h-64" />
      </EditPropertyForm>
    </>
  );
}