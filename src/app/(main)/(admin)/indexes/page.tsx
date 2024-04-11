import PageClient from '@/app/(main)/(admin)/indexes/page.client';
import { authGuard } from '@/lib/auth-server';

export default async function Page () {
  await authGuard('admin');

  return <PageClient />;
}
