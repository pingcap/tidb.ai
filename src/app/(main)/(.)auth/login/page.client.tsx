'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function SigninDialog ({ callbackUrl }: { callbackUrl?: string }) {
  const router = useRouter();

  const [error, setError] = useState<string>();

  const form = useForm<{ username: string, password: string }>();

  const handleSubmit = form.handleSubmit(async (data) => {
    setError(undefined);
    const res = await signIn('credentials', { callbackUrl: callbackUrl, redirect: false, ...data });
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
    <Dialog open onOpenChange={open => {
      if (!open) {
        router.back();
      }
    }}>
      <DialogContent>
        <DialogHeader>
          Login
        </DialogHeader>
        {error && <Alert variant="destructive">
          <AlertDescription>Could not login with provided credentials.</AlertDescription>
        </Alert>}
        <Form {...form}>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <FormItem>
              <FormField name="username" render={({ field }) => <Input placeholder="Username" {...field} />} />
            </FormItem>
            <FormItem>
              <FormField name="password" render={({ field }) => <Input placeholder="Passwprd" type="password" {...field} />} />
            </FormItem>
            <Button>Login</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
