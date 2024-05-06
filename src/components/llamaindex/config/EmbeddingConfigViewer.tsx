import { useIndexConfigPart } from '@/components/llamaindex/config/use-index-config-part';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import type { Index } from '@/core/repositories/index_';

import {EmbeddingConfigSchema, EmbeddingProvider, getEmbeddingModelOptions} from "@/lib/llamaindex/config/embedding";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export function EmbeddingConfigViewer ({ index }: { index: Index }) {
  const { data: embedding, update: updateEmbedding, isUpdating, isLoading } = useIndexConfigPart(index, 'embedding');
  const disabled = !!index.configured || isLoading || isUpdating;
  const form = useForm({
    values: embedding,
    disabled,
    resolver: zodResolver(EmbeddingConfigSchema),
  });

  const handleSubmit = form.handleSubmit((value) => {
    updateEmbedding(value);
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
              <FormLabel>Embedding Provider</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      Object.values(EmbeddingProvider).map(provider => (
                        <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="options.model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Name</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      Object.keys(getEmbeddingModelOptions(form.getValues('provider'))).map(provider => (
                        <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="options.dimensions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dimensions</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? 1536} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4" disabled={disabled}>Submit</Button>
      </Form>
    </form>
  );
}