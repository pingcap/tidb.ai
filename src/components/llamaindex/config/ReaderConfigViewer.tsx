import { useIndexConfigPart } from '@/components/llamaindex/config/use-index-config-part';
import { Accordion } from '@/components/ui/accordion';
import AutoFormArray from '@/components/ui/auto-form/fields/array';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import type { Index } from '@/core/repositories/index_';
import { htmlSelectorArray } from '@/lib/zod-extensions/types/html-selector-array';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  'rag_$loader_$html': z.object({
    contentExtraction: z.object({
      url: z.string(),
      excludeSelectors: htmlSelectorArray(),
      selectors: htmlSelectorArray(),
    }).array().describe('HTML Loader Rules')
  }).describe('HTML Loader Configuration'),
});

function toSafeName (record: Record<string, any> | undefined) {
  if (!record) {
    return undefined;
  }
  return Object.fromEntries(Object.entries(record).map(([key, value]) => {
    return [key.replace(/\./g, '_$'), value];
  }));
}

function fromSafeName (record: Record<string, any>) {
  return Object.fromEntries(Object.entries(record).map(([key, value]) => {
    return [key.replace(/_\$/g, '.'), value];
  }));
}

export function ReaderConfigViewer ({ index }: { index: Index }) {
  const { data: reader, update: updateReader, isUpdating, isLoading } = useIndexConfigPart(index, 'reader');
  const disabled = !!index.configured || isLoading || isUpdating;

  const form = useForm({
    values: toSafeName(reader),
    disabled,
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit((value) => {
    value = fromSafeName(value);
    updateReader(value);
  }, e => {
    console.log(e)
  });

  useEffect(() => {
    if (!isLoading && reader) {
      form.reset(toSafeName(reader));
    }
  }, [isLoading, reader]);

  return (
    <form onSubmit={handleSubmit}>
      <Form {...form}>
        <Accordion type="single" defaultValue="rag_$loader_$html.contentExtraction">
          <AutoFormArray name="rag_$loader_$html.contentExtraction" path={['rag_$loader_$html', 'contentExtraction']} item={schema.shape.rag_$loader_$html.shape.contentExtraction} form={form} />
        </Accordion>
        <Button className="mt-4" disabled={disabled}>Submit</Button>
      </Form>
    </form>
  );
}