'use client';

import AutoForm from '@/components/ui/auto-form';
import type { DB } from '@/core/db/schema';
import type { ExtensionInfo } from '@/core/registry';
import { fetcher, handleErrors } from '@/lib/fetch';
import { baseRegistry } from '@/rag-spec/base';
import type { Selectable } from 'kysely';
import { cache, use, useId, useState } from 'react';
import useSWR from 'swr';

export interface ExtensionConfigProps {
  id?: string;
  disabled?: boolean;
  values?: any;
  Extension: ExtensionInfo;

  onSubmit (options: any): void;

  onValuesChange (options: any): void;

  onParsedValuesChange (options: any): void;
}

export function ExtensionConfig ({
  id,
  disabled,
  onValuesChange,
  onParsedValuesChange,
  values,
  onSubmit,
  Extension,
}: ExtensionConfigProps) {
  return (
    <AutoForm<any>
      className="max-w-screen-sm"
      id={id}
      disabled={disabled}
      formSchema={Extension.optionsSchema}
      values={values}
      onValuesChange={onValuesChange}
      onParsedValuesChange={onParsedValuesChange}
      onSubmit={onSubmit}
    >
    </AutoForm>
  );
}

export function useExtensionConfig (base: string, extension: ExtensionInfo) {
  useSWR(['get', base], fetcher<Selectable<DB['index']>>, {
    onSuccess (data) {
      setValue((options: any) => {
        if (options) {
          return options;
        }
        const raw = (data.config as any)[extension.identifier];
        if (raw) {
          return extension.optionsSchema.parse(raw);
        } else {
          return {};
        }
      });
    },
  });

  const [value, setValue] = useState<any | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<unknown>();
  const id = useId();

  return {
    id: extension.identifier + '-' + id,
    values: value,
    disabled: !value || submitting,
    onValuesChange: (value: any) => setValue(value),
    onSubmit: (value: any) => {
      setSubmitting(true);
      fetch(base + '/config', {
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

const getExtension = (i: string) => {
  if (_cached.has(i)) {
    return _cached.get(i)!
  }
  const promise = baseRegistry.getComponent(i).then(res => res!);
  _cached.set(i, promise);
  return promise;
};

const _cached = new Map<string, Promise<ExtensionInfo>>();

export function useExtension (identifier: string) {
  return use(getExtension(identifier))!;
}
