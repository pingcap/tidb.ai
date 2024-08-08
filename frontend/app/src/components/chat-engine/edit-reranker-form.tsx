'use client';

import { type ChatEngine, updateChatEngine } from '@/api/chat-engines';
import { listRerankers } from '@/api/rerankers';
import { RerankerSelect } from '@/components/form/biz';
import { FormFieldBasicLayout } from '@/components/form/field-layout';
import { useManagedDialog } from '@/components/managed-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';
import { z } from 'zod';

const schema = z.object({
  reranker: z.number(),
});

export interface EditRerankerFormProps {
  chatEngine: ChatEngine;
}

export function EditRerankerForm ({ chatEngine }: EditRerankerFormProps) {
  const router = useRouter();
  const [transitioning, startTransition] = useTransition();
  const { setOpen } = useManagedDialog();
  const { data: rerankers } = useSWR('api.rerankers.list-all', () => listRerankers({ size: 100 }));

  const form = useForm<{ reranker: number }>({
    resolver: zodResolver(schema),
    defaultValues: {
      reranker: chatEngine.reranker_id ?? undefined,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await updateChatEngine(chatEngine.id, {
      reranker_id: data.reranker,
    });
    startTransition(() => {
      router.refresh();
    });
    toast(`ChatEngine's reranker successfully updated.`);
    setOpen(false);
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Update chat engine&#39;s Reranker</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form id="update-form" className="space-y-4" onSubmit={handleSubmit}>
          <FormFieldBasicLayout name="reranker" label="Reranker">
            <RerankerSelect />
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