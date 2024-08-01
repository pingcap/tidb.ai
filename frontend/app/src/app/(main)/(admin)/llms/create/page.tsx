'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { CreateLLMForm } from '@/components/llm/CreateLLMForm';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { z } from 'zod';

const unsetForm = z.object({
  name: z.string().min(1, 'Must not empty'),
  provider: z.string().min(1, 'Must not empty'),
  config: z.object({}).passthrough().optional(),
  is_default: z.boolean().optional(),
});

const strCredentialForm = unsetForm.extend({
  model: z.string().min(1, 'Must not empty'),
  credentials: z.string().min(1, 'Must not empty'),
});

const dictCredentialForm = unsetForm.extend({
  model: z.string().min(1, 'Must not empty'),
  credentials: z.object({}).passthrough(),
});

export default function Page () {
  const router = useRouter();
  const [transitioning, startTransition] = useTransition();

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'LLMs', url: '/llms' },
          { title: 'Create' },
        ]}
      />
      <CreateLLMForm
        transitioning={transitioning}
        onCreated={llm => {
          startTransition(() => {
            router.push(`/llms/${llm.id}`);
          });
        }}
      />
    </>
  );
}