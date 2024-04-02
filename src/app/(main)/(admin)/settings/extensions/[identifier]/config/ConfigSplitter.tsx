'use client';

import type { ConfigProps } from '@/app/(main)/(admin)/settings/extensions/[identifier]/config/common';
import { ExtensionConfig, useExtensionConfig } from '@/components/extension-config';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useExtension } from '@/components/use-extension';
import { getErrorMessage } from '@/lib/errors';

export function ConfigSplitter ({ identifier, base }: ConfigProps) {
  const Extension = useExtension(identifier);
  const { submitError, reset, ...props } = useExtensionConfig(base, Extension);
  const hasConfig = Object.keys(Extension.optionsSchema.shape).length > 0;

  return (
    <>
      {submitError != null && <Alert variant="destructive">
        <AlertTitle>{getErrorMessage(submitError)}</AlertTitle>
      </Alert>}
      {hasConfig && <ExtensionConfig
        Extension={Extension}
        {...props}
        onParsedValuesChange={() => {}}
      />}
      {!hasConfig && <div className="text-sm">{Extension.displayName} has no custom options currently.</div>}
      <div className="flex gap-2 items-center">
        {hasConfig && <Button form={props.id} disabled={props.disabled}>Save</Button>}
        {hasConfig && <Button disabled={props.disabled} onClick={reset} variant="destructive">Reset</Button>}
      </div>
    </>
  );
}

export function Try () {
  return null;
}
