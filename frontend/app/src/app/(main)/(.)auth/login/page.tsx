import { headers } from 'next/headers';
import { SigninDialog } from './page.client';

export default async function Page () {
  const referer = headers().get('Referer') ?? undefined;

  return (
    <SigninDialog callbackUrl={referer} />
  );
}
