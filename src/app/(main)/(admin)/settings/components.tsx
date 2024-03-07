'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import AutoForm from '@/components/ui/auto-form';
import * as z from 'zod';
import { handleErrors } from '@/lib/fetch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

export function SettingsNavigation(props: {
  tabs: { id: string; name: string; href: string }[];
}) {
  const { tabs } = props;
  const pathname = usePathname();

  return (
    <ul className='flex lg:flex-col gap-1.5 lg:w-[200px]'>
      {tabs.map((tab) => (
        <NextLink key={tab.id} href={tab.href}>
          <Button
            className='w-full justify-start'
            variant={pathname === tab.href ? 'default' : 'ghost'}
          >
            {tab.name}
          </Button>
        </NextLink>
      ))}
    </ul>
  );
}

export function NewProviderCardItem(props: {
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
          <Button variant='outline'>
            {providerMemo?.Icon && (
              <providerMemo.Icon className='w-6 h-6 inline mr-2' />
            )}
            {providerMemo?.name || provider}
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
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
              <Button type='submit' disabled={disabled}>
                Add
              </Button>
            </DialogFooter>
          </AutoForm>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ProviderCardItem(props: {
  provider: string;
  enabled?: boolean;
  handleRemove?: (provider: string) => void;
  handleAct?: () => void;
  handleUpdate?: (
    provider: string,
    data: {
      client_id: string;
      client_secret: string;
    }
  ) => void;
  isLoading?: boolean;
}) {
  const {
    provider,
    enabled,
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
      <div className='rounded-md border p-4 w-full max-w-[350px]'>
        <div className='flex items-center space-x-4'>
          {providerMemo?.Icon ? (
            <providerMemo.Icon className='w-6 h-6 inline' />
          ) : (
            <IconRocketRun className='w-6 h-6 inline' />
          )}
          <div className='flex-1 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {providerMemo.name}
            </p>
            <p className='text-sm text-muted-foreground'>
              Activate / Deactivate
            </p>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={handleAct}
            disabled={isLoading}
          />
        </div>

        <div className='mt-4 flex justify-end gap-2'>
          <DeleteButtonWithDialog
            isLoading={isLoading}
            onConfirm={() => {
              handleRemove?.(provider);
            }}
          />
          <UpdateButtonWithDialog
            provider={providerMemo.id}
            isLoading={isLoading}
            title={providerMemo.name}
            onConfirm={(data: { client_id: string; client_secret: string }) => {
              handleUpdate?.(provider, data);
            }}
          />
        </div>
      </div>
    </>
  );
}

export const ProviderSchema = z.object({
  client_id: z.string({
    required_error: 'clientId is required',
  }),
  client_secret: z.string({
    required_error: 'clientSecret is required',
  }),
});

export function useProvider() {
  const [configuredProviders, setConfiguredProviders] = React.useState<
    {
      name: string;
      enabled: number;
    }[]
  >([]);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<unknown>();

  React.useEffect(() => {
    fetch('/api/v1/authentication-providers')
      .then((res) => res.json())
      .then((res) => {
        setConfiguredProviders(res);
      });
  }, []);

  return {
    configuredProviders,
    add: (data: {
      provider: string;
      client_id: string;
      client_secret: string;
    }) => {
      setSubmitting(true);
      fetch('/api/v1/authentication-providers', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.provider,
          config: {
            client_id: data.client_id,
            client_secret: data.client_secret,
          },
        }),
      })
        .then(handleErrors)
        .then(() => setSubmitError(undefined), setSubmitError)
        .then(() => {
          setConfiguredProviders([
            ...configuredProviders,
            {
              name: data.provider,
              enabled: 0,
            },
          ]);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    act: (type: 'enable' | 'disable', provider: string) => {
      setSubmitting(true);
      fetch(`/api/v1/authentication-providers/${provider}/${type}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(handleErrors)
        .then(() => setSubmitError(undefined), setSubmitError)
        .then(() => {
          setConfiguredProviders(
            configuredProviders.map((i) => {
              if (i.name === provider) {
                return {
                  ...i,
                  enabled: type === 'enable' ? 1 : 0,
                };
              }
              return i;
            })
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    remove: (provider: string) => {
      setSubmitting(true);
      fetch(`/api/v1/authentication-providers/${provider}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(handleErrors)
        .then(() => setSubmitError(undefined), setSubmitError)
        .then(() => {
          setConfiguredProviders(
            configuredProviders.filter((i) => i.name !== provider)
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    update: (
      provider: string,
      data: {
        client_id: string;
        client_secret: string;
      }
    ) => {
      setSubmitting(true);
      fetch(`/api/v1/authentication-providers/${provider}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(handleErrors)
        .then(() => setSubmitError(undefined), setSubmitError)
        .finally(() => {
          setSubmitting(false);
        });
    },
    isLoading: submitting,
    error: submitError,
  };
}

export const IconGoogle = (props: React.HTMLProps<SVGSVGElement>) => {
  return (
    <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        d='M12 22a10 10 0 0 1-7.1-3A9.9 9.9 0 0 1 5 4.8C7 3 9.5 2 12.2 2h.2c2.4 0 4.8 1 6.6 2.6l-2.5 2.3a6.2 6.2 0 0 0-4.2-1.6c-1.8 0-3.5.7-4.8 2a6.6 6.6 0 0 0-.1 9.3c1.2 1.3 2.9 2 4.7 2h.1a6 6 0 0 0 4-1.1c1-.9 1.8-2 2.1-3.4v-.2h-6v-3.4h9.6l.1 1.9c-.1 5.7-4 9.6-9.7 9.6H12Z'
        clipRule='evenodd'
      />
    </svg>
  );
};

export const IconGitHub = (props: React.HTMLProps<SVGSVGElement>) => {
  return (
    <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        d='M12 2c-2.4 0-4.7.9-6.5 2.4a10.5 10.5 0 0 0-2 13.1A10 10 0 0 0 8.7 22c.5 0 .7-.2.7-.5v-2c-2.8.7-3.4-1.1-3.4-1.1-.1-.6-.5-1.2-1-1.5-1-.7 0-.7 0-.7a2 2 0 0 1 1.5 1.1 2.2 2.2 0 0 0 1.3 1 2 2 0 0 0 1.6-.1c0-.6.3-1 .7-1.4-2.2-.3-4.6-1.2-4.6-5 0-1.1.4-2 1-2.8a4 4 0 0 1 .2-2.7s.8-.3 2.7 1c1.6-.5 3.4-.5 5 0 2-1.3 2.8-1 2.8-1 .3.8.4 1.8 0 2.7a4 4 0 0 1 1 2.7c0 4-2.3 4.8-4.5 5a2.5 2.5 0 0 1 .7 2v2.8c0 .3.2.6.7.5a10 10 0 0 0 5.4-4.4 10.5 10.5 0 0 0-2.1-13.2A9.8 9.8 0 0 0 12 2Z'
        clipRule='evenodd'
      />
    </svg>
  );
};

export const IconMicrosoft = (props: React.HTMLProps<SVGSVGElement>) => {
  return (
    <svg viewBox='0 0 30 30' {...props}>
      <path d='M 6 4 C 4.895 4 4 4.895 4 6 L 4 12 C 4 13.105 4.895 14 6 14 L 12 14 C 13.105 14 14 13.105 14 12 L 14 6 C 14 4.895 13.105 4 12 4 L 6 4 z M 18 4 C 16.895 4 16 4.895 16 6 L 16 12 C 16 13.105 16.895 14 18 14 L 24 14 C 25.105 14 26 13.105 26 12 L 26 6 C 26 4.895 25.105 4 24 4 L 18 4 z M 6 16 C 4.895 16 4 16.895 4 18 L 4 24 C 4 25.105 4.895 26 6 26 L 12 26 C 13.105 26 14 25.105 14 24 L 14 18 C 14 16.895 13.105 16 12 16 L 6 16 z M 18 16 C 16.895 16 16 16.895 16 18 L 16 24 C 16 25.105 16.895 26 18 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 18 C 26 16.895 25.105 16 24 16 L 18 16 z'></path>
    </svg>
  );
};

export const IconRocketRun = (props: React.HTMLProps<SVGSVGElement>) => {
  return (
    <svg
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z'
      />
    </svg>
  );
};

function DeleteButtonWithDialog(props: {
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
        variant='ghost'
        size='sm'
        disabled={isLoading}
        onClick={() => {
          setOpen(true);
        }}
      >
        Delete
      </Button>
      <Dialog open={open} onOpenChange={onCloseCallback}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='ghost' onClick={onCloseCallback}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={onConfirmCallback}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function UpdateButtonWithDialog(props: {
  onClose?: () => void;
  onConfirm?: (data: { client_id: string; client_secret: string }) => void;
  isLoading?: boolean;
  provider: string;
  title?: string;
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
    [onConfirm]
  );

  return (
    <>
      <Button
        variant='secondary'
        size='sm'
        disabled={isLoading}
        onClick={() => {
          setOpen(true);
        }}
      >
        Update
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
              <Button variant='ghost' onClick={onCloseCallback}>
                Cancel
              </Button>
              <Button
                type='submit'
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

export const supportedProviders = [
  {
    id: 'google',
    name: 'Google',
    Icon: IconGoogle,
  },
  {
    id: 'github',
    name: 'GitHub',
    Icon: IconGitHub,
  },
  {
    id: 'azure-ad',
    name: 'MicroSoft',
    Icon: IconMicrosoft,
  },
];
