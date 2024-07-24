'use client';

import { type ChatEngine, updateChatEngine } from '@/api/chat-engines';
import { useManagedDialog } from '@/components/managed-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  is_default: z.literal(true),
});

export interface EditIsDefaultFormProps {
  chatEngine: ChatEngine;
}

export function EditIsDefaultForm ({ chatEngine }: EditIsDefaultFormProps) {
  const router = useRouter();
  const [transitioning, startTransition] = useTransition();
  const { setOpen } = useManagedDialog();

  const form = useForm<{ is_default: boolean }>({
    resolver: zodResolver(schema),
    disabled: chatEngine.is_default,
    defaultValues: {
      is_default: chatEngine.is_default,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await updateChatEngine(chatEngine.id, data);
    startTransition(() => {
      router.refresh();
    });
    toast('ChatEngine\'s is_default successfully updated.');
    setOpen(false);
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Update chat engine&#39;s is_default</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form id="update-form" className="space-y-4" onSubmit={handleSubmit}>
          <FormField
            name="is_default"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch name={field.name} onBlur={field.onBlur} checked={field.value} onCheckedChange={field.onChange} disabled={field.disabled}></Switch>
                </FormControl>
                {chatEngine.is_default && <FormDescription>
                  Cannot unset default chat engine. Please set another chat engine to default.
                </FormDescription>}
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