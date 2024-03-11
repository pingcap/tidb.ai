'use client';

import { RagComponentSelector } from '@/components/rag-component-selector';
import { Button } from '@/components/ui/button';
import { Form, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export function RagSettingsForm ({
  llm, embedding, reranker,
  embeddings, llms, rerankers,
}: {
  llm: string | null,
  embedding: string | null,
  reranker: string | null,
  embeddings: { identifier: string, displayName: string }[]
  llms: { identifier: string, displayName: string }[]
  rerankers: { identifier: string, displayName: string }[]
}) {
  const form = useForm<{ llm?: string, reranker?: string, embedding?: string }>({
    defaultValues: {
      llm: addPrefix(llm, 'rag.chat-model'),
      embedding: addPrefix(embedding, 'rag.embeddings'),
      reranker: addPrefix(reranker, 'rag.reranker'),
    },
  });

  const handleSubmit = form.handleSubmit(submit);

  return (
    <Form {...form} >
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <FormItem>
          <FormField
            name="embedding"
            disabled
            render={({ field }) => (
              <>
                <FormLabel>Embedding</FormLabel>
                <RagComponentSelector name={field.name} disabled={field.disabled} options={embeddings} value={field.value} onSelectValue={field.onChange} triggerRef={field.ref} />
                <FormDescription>
                  Changing embedding needs all document indexes to be re-computed. Currently immutable.
                  {' '}
                  <Link className="text-foreground underline" href={`/`}>More options</Link>
                  {` for ${findOptionDisplayName(embeddings, field.value)}`}
                </FormDescription>
              </>
            )}
          />
        </FormItem>
        <FormItem>
          <FormField
            name="llm"
            render={({ field }) => (
              <>
                <FormLabel>Chat Model</FormLabel>
                <RagComponentSelector name={field.name} disabled={field.disabled} options={llms} value={field.value} onSelectValue={field.onChange} triggerRef={field.ref} />
                {field.value && (
                  <FormDescription>
                    <Link className="text-foreground underline" href={`/`}>More options</Link>
                    {` for ${findOptionDisplayName(llms, field.value)}`}
                  </FormDescription>
                )}
              </>
            )}
          />
        </FormItem>
        <FormItem>
          <FormField
            name="reranker"
            render={({ field }) => (
              <>
                <FormLabel>Reranker</FormLabel>
                <RagComponentSelector name={field.name} disabled={field.disabled} options={rerankers} value={field.value} onSelectValue={field.onChange} triggerRef={field.ref} />
                <FormDescription>
                  <Link className="text-foreground underline" href={`/`}>More options</Link>
                  {` for ${findOptionDisplayName(rerankers, field.value)}`}
                </FormDescription>
              </>
            )}
          />
        </FormItem>

        <Button>Save</Button>
      </form>
    </Form>
  );
}

function addPrefix (name: string | null, prefix: string) {
  if (name) {
    if (name.includes('.')) {
      return name;
    } else {
      return `${prefix}.${name}`;
    }
  }
  return undefined;
}

function findOptionDisplayName (options: { identifier: string, displayName: string }[], value: string): string {
  return options.find(option => option.identifier === value)?.displayName ?? value;
}

const submit = withToast((data: { llm?: string, reranker?: string, embedding?: string }) =>
  fetch(`/api/v1/indexes/default`, {
    method: 'put',
    body: JSON.stringify(data),
  }).then(handleErrors).then(() => {}),
);

