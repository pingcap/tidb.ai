'use client';

import { Signin } from '@/components/signin';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
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
        <DialogHeader>Login</DialogHeader>
        <Signin callbackUrl={callbackUrl} />
      </DialogContent>
    </Dialog>
  );
}
