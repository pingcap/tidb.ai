import { IconGitHub, IconGoogle, IconMicrosoft } from '@/app/(main)/(admin)/settings/authentication/icons';
import { handleErrors } from '@/lib/fetch';
import * as React from 'react';
import * as z from 'zod';

export const supportedProviders = [
  {
    id: 'github',
    name: 'GitHub',
    Icon: IconGitHub,
  },
  {
    id: 'google',
    name: 'Google',
    Icon: IconGoogle,
  },
  {
    id: 'azure-ad',
    name: 'MicroSoft',
    Icon: IconMicrosoft,
  },
];

export const ProviderSchema = z.object({
  client_id: z.string({
    required_error: 'clientId is required',
  }),
  client_secret: z.string({
    required_error: 'clientSecret is required',
  }),
});

export function useProvider () {
  const [configuredProviders, setConfiguredProviders] = React.useState<
    {
      name: string;
      enabled: number;
      configured: boolean;
    }[]
  >(() => {
    return supportedProviders.map(provider => ({
      name: provider.id,
      enabled: 0,
      configured: false,
    }));
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<unknown>();

  React.useEffect(() => {
    fetch('/api/v1/authentication/providers')
      .then((res) => res.json())
      .then((res: { name: string, enabled: number }[]) => {
        setConfiguredProviders(supportedProviders.map(provider => {
          const item = res.find(item => item.name === provider.id);
          return ({
            name: provider.id,
            enabled: item?.enabled ?? 0,
            configured: !!item,
          });
        }));
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
      fetch('/api/v1/authentication/providers', {
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
          setConfiguredProviders(([...providers]) => {
            const provider = providers.find(provider => provider.name === data.provider);
            if (provider) {
              provider.configured = true;
              provider.enabled = 0;
            }
            return providers;
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    act: (type: 'enable' | 'disable', provider: string) => {
      setSubmitting(true);
      fetch(`/api/v1/authentication/providers/${provider}/${type}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(handleErrors)
        .then(() => setSubmitError(undefined), setSubmitError)
        .then(() => {
          setConfiguredProviders(([...providers]) => {
            const item = providers.find(item => item.name === provider);
            if (item) {
              item.enabled = type === 'enable' ? 1 : 0;
            }
            return providers;
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    remove: (provider: string) => {
      setSubmitting(true);
      fetch(`/api/v1/authentication/providers/${provider}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(handleErrors)
        .then(() => setSubmitError(undefined), setSubmitError)
        .then(() => {
          setConfiguredProviders(([...providers]) => {
            const item = providers.find((i) => i.name === provider);
            if (item) {
              item.configured = false;
              item.enabled = 0;
            }
            return providers;
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    update: (
      { provider, ...data }: {
        provider: string,
        client_id: string;
        client_secret: string;
      },
    ) => {
      setSubmitting(true);
      fetch(`/api/v1/authentication/providers/${provider}`, {
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
