'use client';

import { type ChatEngine, updateChatEngine } from '@/api/chat-engines';
import { useManagedDialog } from '@/components/managed-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  prompt: z.string().min(1),
});

export interface EditOptionsLlmPromptFormProps {
  chatEngine: ChatEngine;
  type: 'intent_graph_knowledge'
    | 'normal_graph_knowledge'
    | 'condense_question_prompt'
    | 'refine_prompt'
    | 'text_qa_prompt';
}

export function EditOptionsLlmPromptForm ({ chatEngine, type }: EditOptionsLlmPromptFormProps) {
  const router = useRouter();
  const [transitioning, startTransition] = useTransition();
  const { setOpen } = useManagedDialog();

  const form = useForm<{ prompt: string }>({
    resolver: zodResolver(schema),
    defaultValues: {
      prompt: chatEngine.engine_options.llm[type],
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const chatEngineOptions = {
      ...chatEngine.engine_options,
      llm: {
        ...chatEngine.engine_options.llm,
        [type]: data.prompt,
      },
    };
    await updateChatEngine(chatEngine.id, { engine_options: chatEngineOptions });
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
          <FormField
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{type}</FormLabel>
                <FormControl>
                  <Textarea className='min-h-[50vh]' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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