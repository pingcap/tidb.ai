'use client';

import { login } from '@/api/auth';
// import { supportedProviders } from '@/app/(main)/(admin)/settings/authentication/providers';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getErrorMessage } from '@/lib/errors';
import { Loader2Icon } from 'lucide-react';
// import { fetcher } from '@/lib/fetch';
// import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

export function Signin ({ callbackUrl }: { callbackUrl?: string }) {
  const router = useRouter();

  const [error, setError] = useState<string>();
  const [transitioning, startTransition] = useTransition();

  const form = useForm<{ username: string; password: string }>();

  const handleSubmit = form.handleSubmit(async (data) => {
    setError(undefined);
    try {
      await login(data);
      startTransition(() => {
        router.replace(refineCallbackUrl(callbackUrl));
        router.refresh();
      });
    } catch (error) {
      setError(getErrorMessage(error));
    }
  });

  const loading = form.formState.isSubmitting || transitioning;

  return (
    <>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            Could not login with provided credentials.
          </AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <FormItem>
            <FormLabel htmlFor="username">Username</FormLabel>
            <FormField
              name="username"
              render={({ field }) => (
                <Input placeholder="x@example.com" {...field} />
              )}
            />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormField
              name="password"
              render={({ field }) => (
                <Input type="password" {...field} />
              )}
            />
          </FormItem>
          <Button className="!mt-4 w-full" disabled={loading}>
            {loading && <Loader2Icon className="w-4 h-4 mr-2 animate-spin repeat-infinite" />}
            {transitioning ? 'Redirecting...' : loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
    </>
  );
}

function refineCallbackUrl (url: string | undefined) {
  if (!url) {
    return `${location.origin}`;
  }
  if (/auth\/login/.test(url)) {
    return `${location.origin}`;
  } else {
    return url;
  }
}
