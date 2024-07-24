'use client';

import { type ChatEngine, updateChatEngine } from '@/api/chat-engines';
import { useManagedDialog } from '@/components/managed-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
});

export interface EditNameFormProps {
  chatEngine: ChatEngine;
}

export function EditNameForm ({ chatEngine }: EditNameFormProps) {
  const router = useRouter();
  const [transitioning, startTransition] = useTransition();
  const { setOpen } = useManagedDialog();

  const form = useForm<{ name: string }>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: chatEngine.name,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await updateChatEngine(chatEngine.id, data);
    startTransition(() => {
      router.refresh();
    });
    toast('ChatEngine\'s name successfully updated.');
    setOpen(false);
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Update chat engine&#39;s name</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form id="update-form" className="space-y-4" onSubmit={handleSubmit}>
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter>
        <Button type="submit" form='update-form' disabled={form.formState.disabled || form.formState.isSubmitting || transitioning}>
          Update
        </Button>
      </DialogFooter>
    </>
  );
}