import { useIndexConfigPart } from '@/components/llamaindex/config/use-index-config-part';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Index } from '@/core/repositories/index_';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  textSplitter: z.object({
    chunkSize: z.coerce.number().optional(),
    chunkOverlap: z.coerce.number().optional(),
    paragraphSeparator: z.string().optional(),
    splitLongSentences: z.boolean().optional(),
  }),
});

export function LlmConfigViewer ({ index }: { index: Index }) {
  const { data: llm, update: updateLlm, isUpdating, isLoading } = useIndexConfigPart(index, 'llm');
  const disabled = !!index.configured || isLoading || isUpdating;

  const form = useForm({
    values: llm,
    disabled,
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit((value) => {
    // updateLlm(value);
    console.log(value);
  });

  useEffect(() => {
    if (!isLoading && llm) {
      form.reset(llm);
    }
  }, [isLoading, llm]);

  return (
    <form onSubmit={handleSubmit}>
      <Form {...form}>
        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LLM Provider</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="config.model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-4' disabled={disabled}>Submit</Button>
      </Form>
    </form>
  );
}