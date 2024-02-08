'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AutoForm from '@/components/ui/auto-form';
import * as z from 'zod';
import { fetcher, handleErrors } from '@/lib/fetch';
import useSWR from 'swr';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

// todo: add middleware to redirect to login page(if anonymous)

export default function Page() {
  const { configuredProviders, add, isLoading, error, act, remove } =
    useProvider();

  return (
    <>
      <h1 className='text-2xl font-semibold mb-4'>Authentication Configure</h1>
      <div>
        <ul className='flex gap-2'>
          {configuredProviders.map((provider) => {
            return (
              <li key={provider.name} className='w-fit'>
                <ProviderCardItem
                  provider={provider.name}
                  enabled={provider.enabled > 0}
                  handleAct={() => {
                    act(
                      provider.enabled > 0 ? 'disable' : 'enable',
                      provider.name
                    );
                  }}
                  handleRemove={remove}
                  isLoading={isLoading}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <h2 className='text-xl font-semibold mb-4'>Add</h2>
      <div>
        <ul className='flex gap-2'>
          {supportedProviders
            .filter(
              (i) => !configuredProviders.map((j) => j.name).includes(i.id)
            )
            .map((provider) => {
              return (
                <li key={provider.id} className='w-fit'>
                  <NewProviderCardItem
                    provider={provider.id}
                    handleAdd={add}
                    disabled={isLoading}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

const ProviderSchema = z.object({
  client_id: z.string({
    required_error: 'clientId is required',
  }),
  client_secret: z.string({
    required_error: 'clientSecret is required',
  }),
});

function useProvider() {
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
    isLoading: submitting,
    error: submitError,
  };
}

export const supportedProviders = [
  {
    id: 'google',
    name: 'Google',
  },
  {
    id: 'github',
    name: 'GitHub',
  },
  {
    id: 'azure-ad',
    name: 'MicroSoft',
  },
];

const NewProviderCardItem = (props: {
  provider: string;
  handleAdd?: (data: {
    provider: string;
    client_id: string;
    client_secret: string;
  }) => void;
  disabled?: boolean;
}) => {
  const { provider, handleAdd, disabled } = props;
  const providerNameMemo = React.useMemo(() => {
    return supportedProviders.find((i) => i.id === provider)?.name || provider;
  }, [provider]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>{providerNameMemo}</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add Provider [{providerNameMemo}]</DialogTitle>
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
};

const ProviderCardItem = (props: {
  provider: string;
  enabled?: boolean;
  handleRemove?: (provider: string) => void;
  handleAct?: () => void;
  isLoading?: boolean;
}) => {
  const { provider, enabled, handleRemove, handleAct, isLoading } = props;
  const providerNameMemo = React.useMemo(() => {
    return supportedProviders.find((i) => i.id === provider)?.name || provider;
  }, [provider]);

  return (
    <>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>{providerNameMemo}</CardTitle>
          {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        </CardHeader>
        {/* <CardContent></CardContent> */}
        <CardFooter className='flex justify-between'>
          <Switch
            checked={enabled}
            onCheckedChange={handleAct}
            disabled={isLoading}
          />
          <Button
            variant='destructive'
            disabled={isLoading}
            onClick={() => {
              handleRemove?.(provider);
            }}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
