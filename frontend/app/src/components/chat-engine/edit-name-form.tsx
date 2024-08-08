'use client';

import { type ChatEngine, updateChatEngine } from '@/api/chat-engines';
import { EditPropertyForm } from '@/components/chat-engine/edit-property-form';
import { FormInput } from '@/components/form/control-widget';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

export interface EditNameFormProps {
  chatEngine: ChatEngine;
}

const stringSchema = z.string();

export function EditNameForm ({ chatEngine }: EditNameFormProps) {
  const router = useRouter();
  const [transitioning, startTransition] = useTransition();

  return (
    <EditPropertyForm
      inline
      object={chatEngine}
      property="name"
      schema={stringSchema}
      onSubmit={async (data) => {
        await updateChatEngine(chatEngine.id, data);
        startTransition(() => {
          router.refresh();
        });
        toast('ChatEngine\'s name successfully updated.');
      }}
      disabled={transitioning}
    >
      <FormInput />
    </EditPropertyForm>
  );
}
