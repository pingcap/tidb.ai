import { useIndexConfigPart } from '@/components/llamaindex/config/use-index-config-part';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
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

export function ParserConfigViewer ({ index }: { index: Index }) {
  const { data: parser, update: updateParser, isUpdating, isLoading } = useIndexConfigPart(index, 'parser');
  const disabled = !!index.configured || isLoading || isUpdating;

  const form = useForm({
    values: parser,
    disabled,
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit((value) => {
    updateParser(value);
  });

  useEffect(() => {
    if (!isLoading && parser) {
      form.reset(parser);
    }
  }, [isLoading, parser]);

  return (
    <form onSubmit={handleSubmit}>
      <Form {...form}>
        <FormField
          control={form.control}
          name="textSplitter.chunkSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chunk Size</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="textSplitter.chunkOverlap"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chunk Overlap</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="textSplitter.paragraphSeparator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paragraph Separator</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="textSplitter.splitLongSentences"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Split Long Sentences</FormLabel>
              <FormControl>
                <Switch {...field} checked={value} onCheckedChange={onChange} />
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