'use client';

import type { ConfigProps } from '@/app/(main)/(admin)/extensions/[identifier]/config/common';
import { ExtensionConfig, useExtension, useExtensionConfig } from '@/components/extension-config';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { getErrorMessage } from '@/lib/error';

export function ConfigLoader ({ base, identifier }: ConfigProps) {
  const Extension = useExtension(identifier);
  const { submitError, ...props } = useExtensionConfig(base, Extension);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{Extension.displayName} | Configuration</h1>
      {submitError != null && <Alert variant="destructive">
        <AlertTitle>{getErrorMessage(submitError)}</AlertTitle>
      </Alert>}
      <ExtensionConfig
        Extension={Extension}
        {...props}
        onParsedValuesChange={() => {}}
      />
      <div className="flex gap-2 items-center">
        <Button form={props.id} disabled={props.disabled}>Save</Button>
        {/*<Button disabled={props.disabled} variant="ghost">Reset to defaults</Button>*/}
      </div>
    </div>
  );
}
