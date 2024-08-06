'use client';

import { type ChatEngine, updateChatEngine } from '@/api/chat-engines';
import { listLlms } from '@/api/llms';
import { LLMSelect } from '@/components/form/biz';
import { FormFieldBasicLayout } from '@/components/form/field-layout';
import { LlmInfo } from '@/components/llm/LlmInfo';
import { useManagedDialog } from '@/components/managed-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';
import { z } from 'zod';

const schema = z.object({
  llm: z.number(),
});

export interface EditLlmFormProps {
  chatEngine: ChatEngine;
  type: 'llm' | 'fast_llm';
}

export function EditLlmForm ({ type, chatEngine }: EditLlmFormProps) {
  const router = useRouter();
  const [transitioning, startTransition] = useTransition();
  const { setOpen } = useManagedDialog();
  const { data: llms } = useSWR('api.llms.list-all', () => listLlms({ size: 100 }));

  const form = useForm<{ llm: number }>({
    resolver: zodResolver(schema),
    defaultValues: {
      llm: (type === 'llm' ? chatEngine.llm_id : chatEngine.fast_llm_id) ?? undefined,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await updateChatEngine(chatEngine.id, {
      [type === 'llm' ? 'llm_id' : 'fast_llm_id']: data.llm,
    });
    startTransition(() => {
      router.refresh();
    });
    toast(`ChatEngine's ${type} successfully updated.`);
    setOpen(false);
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Update chat engine&#39;s {type}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form id="update-form" className="space-y-4" onSubmit={handleSubmit}>
          <FormFieldBasicLayout name="llm" label={type === 'llm' ? 'LLM' : 'Fast LLM'}>
            <LLMSelect />
          </FormFieldBasicLayout>
        </form>
      </Form>
      <DialogFooter>
        <Button type="submit" form="update-form" disabled={form.formState.disabled || form.formState.isSubmitting || transitioning}>
          Update
        </Button>
      </DialogFooter>
    </>
  );
}