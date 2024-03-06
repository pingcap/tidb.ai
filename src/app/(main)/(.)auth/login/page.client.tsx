'use client';

import { Signin } from '@/components/signin';
import { Dialog, DialogContent, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export function SigninDialog ({ callbackUrl }: { callbackUrl?: string }) {
  const router = useRouter();

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
        <DialogHeader className='text-2xl font-normal'>Sign In</DialogHeader>
        <DialogDescription>
          Sign in to continue to your account.
        </DialogDescription>
        <Signin callbackUrl={callbackUrl} />
      </DialogContent>
    </Dialog>
  );
}
