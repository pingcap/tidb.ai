import { useIndexConfigPart } from '@/components/llamaindex/config/use-index-config-part';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Index } from '@/core/v1/index_';
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

export function EmbeddingConfigViewer ({ index }: { index: Index }) {
  const { data: embedding, update: updateEmbedding, isUpdating, isLoading } = useIndexConfigPart(index, 'embedding');

  const form = useForm({
    values: embedding,
    disabled: isLoading || isUpdating || true,
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit((value) => {
    // updateEmbedding(value);
    console.log(value);
  });

  useEffect(() => {
    if (!isLoading && embedding) {
      form.reset(embedding);
    }
  }, [isLoading, embedding]);

  return (
    <form onSubmit={handleSubmit}>
      <Form {...form}>
        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>EMBEDDING Provider</FormLabel>
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
        <Button className='mt-4' disabled>Submit</Button>
      </Form>
    </form>
  );
}