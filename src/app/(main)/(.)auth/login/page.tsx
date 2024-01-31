import { SigninDialog } from '@/app/(main)/(.)auth/login/page.client';
import { headers } from 'next/headers';

export default async function Page () {
  const referer = headers().get('Referer') ?? undefined;

  return (
    <SigninDialog callbackUrl={referer} />
  );
}
