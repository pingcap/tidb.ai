'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { fetcher, handleErrors } from '@/lib/fetch';
import { Skeleton } from '@/components/ui/skeleton';

export function SigninDialog({ callbackUrl }: { callbackUrl?: string }) {
  const router = useRouter();

  const [error, setError] = useState<string>();

  const form = useForm<{ username: string; password: string }>();
  const { providers, loading: providersLoading } = useCustomProviders();

  const handleSubmit = form.handleSubmit(async (data) => {
    setError(undefined);
    const res = await signIn('credentials', {
      callbackUrl: callbackUrl,
      redirect: false,
      ...data,
    });
    if (!res) {
      setError('UnknownError');
      return;
    }
    if (res.error) {
      setError(res.error);
    }
    if (res.url) {
      router.replace(res.url);
      router.refresh();
    }
  });

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>Login</DialogHeader>
        {error && (
          <Alert variant='destructive'>
            <AlertDescription>
              Could not login with provided credentials.
            </AlertDescription>
          </Alert>
        )}
        <div className='space-y-2'>
          {providersLoading && <Skeleton className='w-full h-10 rounded' />}
          {!providersLoading &&
            providers.map((provider) => (
              <CustomProviderItem
                key={provider.name}
                provider={provider.name}
              />
            ))}
        </div>
        {providers?.length > 0 && <hr className='my-2'></hr>}
        <Form {...form}>
          <form className='space-y-2' onSubmit={handleSubmit}>
            <FormItem>
              <FormField
                name='username'
                render={({ field }) => (
                  <Input placeholder='Username' {...field} />
                )}
              />
            </FormItem>
            <FormItem>
              <FormField
                name='password'
                render={({ field }) => (
                  <Input placeholder='Passwprd' type='password' {...field} />
                )}
              />
            </FormItem>
            <Button>Login</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function CustomProviderItem(props: { provider: string }) {
  const { provider } = props;

  return (
    <>
      <Button
        className='w-full h-10'
        variant='outline'
        onClick={() => {
          signIn(provider);
        }}
      >
        {provider}
      </Button>
    </>
  );
}

export function useCustomProviders() {
  const [providers, setProviders] = useState<{ name: string; enabled: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useSWR(
    [
      'get',
      `/api/v1/authentication-providers`,
      {
        enabled: true,
      },
    ],
    fetcher<{ name: string; enabled: number}[]>,
    {
      onSuccess: (data) => {
        setProviders(data);
        setLoading(false);
      },
    }
  );

  return { providers, loading };
}
