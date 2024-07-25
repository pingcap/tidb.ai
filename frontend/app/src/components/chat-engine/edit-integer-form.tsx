'use client';

import { type ChatEngine, type ChatEngineOptions, updateChatEngine } from '@/api/chat-engines';
import { useManagedDialog } from '@/components/managed-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  value: z.coerce.number().int(),
});

type BooleanOptionConfig = {
  name: string
  get: (options: ChatEngineOptions) => number
  set: (options: ChatEngineOptions, newValue: number) => void
  min: number
  max: number
}

const config = {
  'kg.depth': {
    name: 'KnowledgeGraph Depth',
    get: opt => opt.knowledge_graph.depth,
    set: (opt, nv) => opt.knowledge_graph.depth = nv,
    min: 0,
    max: 20,
  },
} satisfies Record<string, BooleanOptionConfig>;

export interface EditIntFormProps {
  chatEngine: ChatEngine;
  type: keyof typeof config;
}

export function EditIntForm ({ type, chatEngine }: EditIntFormProps) {
  const router = useRouter();
  const [transitioning, startTransition] = useTransition();
  const { setOpen } = useManagedDialog();
  const { name, min, max, get, set } = config[type];

  const form = useForm<{ value: number }>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: get(chatEngine.engine_options),
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const options: ChatEngineOptions = {
      knowledge_graph: { ...chatEngine.engine_options.knowledge_graph },
      llm: { ...chatEngine.engine_options.llm },
    };
    set(options, data.value);
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
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormControl>
                    <div className='flex gap-2 items-center'>
                      <Slider
                        min={min}
                        max={max}
                        step={1}
                        name={field.name}
                        onBlur={field.onBlur}
                        value={[field.value]}
                        onValueChange={([value]) => field.onChange(value)}
                        disabled={field.disabled}
                      />
                      <span className='block flex-shrink-0 w-20 text-right font-mono'>
                        {field.value}
                      </span>
                    </div>
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
