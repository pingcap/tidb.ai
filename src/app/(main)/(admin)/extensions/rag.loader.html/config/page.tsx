'use client';

import { HtmlLoaderForm } from '@/app/(main)/(admin)/extensions/rag.loader.html/config/form';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import type { DB } from '@/core/db/schema';
import type { ComponentConstructor, ExtractOptions } from '@/core/registry';
import { getErrorMessage } from '@/lib/error';
import { fetcher, handleErrors } from '@/lib/fetch';
import { HtmlLoader } from '@/rag-spec/loaders/HtmlLoader';
import type { Selectable } from 'kysely';
import { useId, useState } from 'react';
import useSWR from 'swr';

function useExtensionConfig<E extends ComponentConstructor<InstanceType<E>>> (indexName: string, extension: E) {
  useSWR(['get', `/api/v1/indexes/${indexName}`], fetcher<Selectable<DB['index']>>, {
    onSuccess (data) {
      setValue((options) => {
        if (options) {
          return options;
        }
        const raw = (data.config as any)[extension.identifier];
        if (raw) {
          return extension.optionsSchema.parse(raw) as ExtractOptions<InstanceType<E>>;
        } else {
          return {} as ExtractOptions<InstanceType<E>>;
        }
      });
    },
  });

  const [value, setValue] = useState<ExtractOptions<InstanceType<E>> | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<unknown>();

  return {
    value,
    onChange: (value: ExtractOptions<InstanceType<E>>) => setValue(value),
    onSubmit: (value: ExtractOptions<InstanceType<E>>) => {
      setSubmitting(true);
      fetch(`/api/v1/indexes/${indexName}/config`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [extension.identifier]: value,
        }),
      }).then(handleErrors)
        .then(() => setSubmitError(undefined), setSubmitError)
        .finally(() => {
          setSubmitting(false);
        });
    },
    submitting,
    submitError,
  };
}

export default function Page () {
  const { value, onChange, submitError, onSubmit, submitting } = useExtensionConfig('default', HtmlLoader);
  const id = useId();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{HtmlLoader.displayName} | Configuration</h1>
      {submitError != null && <Alert variant="destructive">
        <AlertTitle>{getErrorMessage(submitError)}</AlertTitle>
      </Alert>}
      <HtmlLoaderForm id={id} disabled={!value || submitting} options={value} onValuesChange={onChange} onParsedValuesChange={() => {}} onSubmit={onSubmit} />
      <div className="flex gap-2 items-center">
        <Button form={id} disabled={!value || submitting}>Save</Button>
        {/*<Button disabled={!value || submitting} variant="ghost">Reset to defaults</Button>*/}
      </div>
    </div>
  );
}
