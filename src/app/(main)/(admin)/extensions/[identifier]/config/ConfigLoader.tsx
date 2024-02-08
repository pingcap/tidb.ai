'use client';

import type { ConfigProps } from '@/app/(main)/(admin)/extensions/[identifier]/config/common';
import { ExtensionConfig, useExtension, useExtensionConfig } from '@/components/extension-config';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { rag } from '@/core/interface';
import { getErrorMessage } from '@/lib/error';
import { useState, useTransition } from 'react';

export function ConfigLoader ({ base, identifier }: ConfigProps) {
  const Extension = useExtension(identifier);
  const { submitError, reset, ...props } = useExtensionConfig(base, Extension);
  const hasConfig = Object.keys(Extension.optionsSchema.shape).length > 0;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{Extension.displayName} | Configuration</h1>
      {submitError != null && <Alert variant="destructive">
        <AlertTitle>{getErrorMessage(submitError)}</AlertTitle>
      </Alert>}
      {hasConfig && <ExtensionConfig
        Extension={Extension}
        {...props}
        onParsedValuesChange={() => {}}
      />}
      {!hasConfig && <div className='text-sm'>{Extension.displayName} has no custom options currently.</div>}
      <div className="flex gap-2 items-center">
        {hasConfig && <Button form={props.id} disabled={props.disabled}>Save</Button>}
        {hasConfig && <Button disabled={props.disabled} onClick={reset} variant="destructive">Reset</Button>}
        <Try options={props.values} identifier={identifier} />
      </div>
    </div>
  );
}

function Try ({ options, identifier }: { options: any, identifier: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<rag.Content<any>>();
  const [error, setError] = useState<unknown>();
  const [url, setUrl] = useState('');

  const handleTry = () => {
    setLoading(true);
    fetch(`/api/v1/extensions/${encodeURIComponent(identifier)}/process`, {
      method: 'post',
      body: JSON.stringify({
        content: url,
        options,
      }),
    })
      .then(res => res.json())
      .then(response => {
        setResult(response);
        setError(undefined);
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" type="button">Try</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Try content loader</DialogHeader>
        <div className="flex items-center gap-2">
          <Input placeholder="Input a URL..." value={url} onChange={e => setUrl(e.currentTarget.value)} />
          <Button disabled={loading} onClick={handleTry}>Load</Button>
        </div>
        {error != null && <Alert variant="destructive">
          <AlertDescription>{getErrorMessage(error)}</AlertDescription>
        </Alert>}
        {result?.metadata?.warning?.length && (
          <div className="space-y-2">
            {result.metadata.warning.map((warning: any) => (
              <Alert>
                <AlertDescription>{warning}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}
        <ScrollArea className="h-[400px]">
          <pre className="text-xs break-all overflow-hidden whitespace-pre-wrap">{result?.content?.join('\n\n\n\n')}</pre>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
