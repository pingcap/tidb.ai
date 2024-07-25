'use client';

import { type ChatEngine, type ChatEngineOptions, updateChatEngine } from '@/api/chat-engines';
import { useManagedDialog } from '@/components/managed-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  enabled: z.boolean(),
});

type BooleanOptionConfig = {
  name: string
  get: (options: ChatEngineOptions) => boolean
  set: (options: ChatEngineOptions, newValue: boolean) => void
}

const config = {
  'kg.enabled': {
    name: 'Enable KnowledgeGraph',
    get: opt => opt.knowledge_graph.enabled,
    set: (opt, nv) => opt.knowledge_graph.enabled = nv,
  },
  'kg.include_meta': {
    name: 'KnowledgeGraph Include Meta',
    get: opt => opt.knowledge_graph.include_meta,
    set: (opt, nv) => opt.knowledge_graph.include_meta = nv,
  },
  'kg.with_degree': {
    name: 'KnowledgeGraph With Degree',
    get: opt => opt.knowledge_graph.with_degree,
    set: (opt, nv) => opt.knowledge_graph.with_degree = nv,
  },
  'kg.using_intent_search': {
    name: 'KnowledgeGraph Using Intent Search',
    get: opt => opt.knowledge_graph.using_intent_search,
    set: (opt, nv) => opt.knowledge_graph.using_intent_search = nv,
  },
} satisfies Record<string, BooleanOptionConfig>;

export interface EditBooleanFormProps {
  chatEngine: ChatEngine;
  type: keyof typeof config;
}

export function EditBooleanForm ({ type, chatEngine }: EditBooleanFormProps) {
  const router = useRouter();
  const [transitioning, startTransition] = useTransition();
  const { setOpen } = useManagedDialog();
  const { name, get, set } = config[type];

  const form = useForm<{ enabled: boolean }>({
    resolver: zodResolver(schema),
    defaultValues: {
      enabled: get(chatEngine.engine_options),
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const options: ChatEngineOptions = {
      knowledge_graph: { ...chatEngine.engine_options.knowledge_graph },
      llm: { ...chatEngine.engine_options.llm },
    };
    set(options, data.enabled);
    await updateChatEngine(chatEngine.id, { engine_options: options });
    startTransition(() => {
      router.refresh();
    });
    toast(`ChatEngine's ${name} successfully updated.`);
    setOpen(false);
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{name}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form id="update-form" className="space-y-4" onSubmit={handleSubmit}>
          <FormField
            name="enabled"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormControl>
                    <Switch name={field.name} onBlur={field.onBlur} checked={field.value} onCheckedChange={field.onChange} disabled={field.disabled} />
                  </FormControl>
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
