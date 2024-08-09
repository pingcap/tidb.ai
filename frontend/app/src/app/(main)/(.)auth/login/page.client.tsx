'use client';

import { Signin } from '@/components/signin';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal">
            Sign In
          </DialogTitle>
          <DialogDescription>
            Sign in to continue to your account.
          </DialogDescription>
        </DialogHeader>
        <Signin callbackUrl={callbackUrl} />
      </DialogContent>
    </Dialog>
  );
}
