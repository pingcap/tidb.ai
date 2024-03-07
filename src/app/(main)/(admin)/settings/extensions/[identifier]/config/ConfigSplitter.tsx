'use client';

import type { ConfigProps } from '@/app/(main)/(admin)/settings/extensions/[identifier]/config/common';
import { ExtensionConfig, useExtension, useExtensionConfig } from '@/components/extension-config';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { getErrorMessage } from '@/lib/error';

export function ConfigSplitter ({ identifier, base }: ConfigProps) {
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
      </div>
    </div>
  );
}

export function Try () {
  return null;
}
