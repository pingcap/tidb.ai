'use client';

import { IconRocketRun } from '@/app/(main)/(admin)/settings/authentication/icons';
import { ProviderSchema, supportedProviders } from '@/app/(main)/(admin)/settings/authentication/providers';
import AutoForm from '@/components/ui/auto-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import * as React from 'react';

export function NewProviderCardItem (props: {
  provider: string;
  handleAdd?: (data: {
    provider: string;
    client_id: string;
    client_secret: string;
  }) => void;
  disabled?: boolean;
}) {
  const { provider, handleAdd, disabled } = props;
  const providerMemo = React.useMemo(() => {
    return supportedProviders.find((i) => i.id === provider);
  }, [provider]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            {providerMemo?.Icon && (
              <providerMemo.Icon className="w-6 h-6 inline mr-2" />
            )}
            {providerMemo?.name || provider}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Add Provider [{providerMemo?.name || provider}]
            </DialogTitle>
            {/* <DialogDescription>
             Make changes to your profile here. Click save when you're done.
             </DialogDescription> */}
          </DialogHeader>
          <AutoForm
            formSchema={ProviderSchema}
            fieldConfig={{
              client_secret: {
                inputProps: {
                  type: 'password',
                },
              },
            }}
            onSubmit={(data) => {
              handleAdd?.({
                provider,
                client_id: data.client_id,
                client_secret: data.client_secret,
              });
            }}
            disabled={disabled}
          >
            <DialogFooter>
              <Button type="submit" disabled={disabled}>
                Add
              </Button>
            </DialogFooter>
          </AutoForm>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ProviderCardItem (props: {
  provider: string;
  enabled?: boolean;
  handleRemove?: (provider: string) => void;
  handleAct?: () => void;
  configured?: boolean;
  handleUpdate?: (
    data: {
      provider: string,
      client_id: string;
      client_secret: string;
    },
  ) => void;
  isLoading?: boolean;
}) {
  const {
    provider,
    enabled,
    configured,
    handleRemove,
    handleAct,
    isLoading,
    handleUpdate,
  } = props;
  const providerMemo = React.useMemo(() => {
    return supportedProviders.find((i) => i.id === provider) || undefined;
  }, [provider]);

  if (!providerMemo) {
    return null;
  }

  return (
    <>
      <div className="rounded-md border p-4 w-full max-w-[350px]">
        <div className="flex items-center space-x-4">
          {providerMemo?.Icon ? (
            <providerMemo.Icon className="w-6 h-6 inline" />
          ) : (
            <IconRocketRun className="w-6 h-6 inline" />
          )}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {providerMemo.name}
            </p>
            <p className="text-sm text-muted-foreground">
              Activate / Deactivate
            </p>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={handleAct}
            disabled={!configured || isLoading}
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          {configured && <DeleteButtonWithDialog
            isLoading={isLoading}
            onConfirm={() => {
              handleRemove?.(provider);
            }}
          />}
          <UpdateButtonWithDialog
            provider={providerMemo.id}
            isLoading={isLoading}
            title={providerMemo.name}
            onConfirm={(data: { client_id: string; client_secret: string }) => {
              handleUpdate?.({ provider, ...data });
            }}
          />
        </div>
      </div>
    </>
  );
}

function DeleteButtonWithDialog (props: {
  onClose?: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
}) {
  const { onClose, onConfirm, isLoading } = props;
  const [open, setOpen] = React.useState(false);

  const onCloseCallback = React.useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  const onConfirmCallback = React.useCallback(() => {
    setOpen(false);
    onConfirm?.();
  }, [onConfirm]);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        disabled={isLoading}
        onClick={() => {
          setOpen(true);
        }}
      >
        Reset
      </Button>
      <Dialog open={open} onOpenChange={onCloseCallback}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={onCloseCallback}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirmCallback}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function UpdateButtonWithDialog (props: {
  onClose?: () => void;
  onConfirm?: (data: { client_id: string; client_secret: string }) => void;
  isLoading?: boolean;
  provider: string;
  title?: string;
  configured?: boolean;
}) {
  const { onClose, onConfirm, isLoading, title, provider } = props;
  const [open, setOpen] = React.useState(false);

  const onCloseCallback = React.useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  const onConfirmCallback = React.useCallback(
    (data: { client_id: string; client_secret: string }) => {
      setOpen(false);
      onConfirm?.(data);
    },
    [onConfirm],
  );

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        disabled={isLoading}
        onClick={() => {
          setOpen(true);
        }}
      >
        {props.configured ? 'Update' : 'Setup'}
      </Button>
      <Dialog open={open} onOpenChange={onCloseCallback}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title || 'Provider'}</DialogTitle>
            <DialogDescription>
              Update {title || 'Provider'} Configuration
            </DialogDescription>
          </DialogHeader>
          <AutoForm
            formSchema={ProviderSchema}
            fieldConfig={{
              client_secret: {
                inputProps: {
                  type: 'password',
                },
              },
            }}
            onSubmit={(data) => {
              onConfirmCallback?.({
                client_id: data.client_id,
                client_secret: data.client_secret,
              });
            }}
          >
            <DialogFooter>
              <Button variant="ghost" onClick={onCloseCallback}>
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  console.log('provider', provider);
                }}
              >
                Update
              </Button>
            </DialogFooter>
          </AutoForm>
        </DialogContent>
      </Dialog>
    </>
  );
}
