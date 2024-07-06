import { getMe, type MeInfo } from '@/api/users';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const auth = cache(() => getMe().catch(() => undefined));

export async function requireAuth (): Promise<MeInfo> {
  const me = await auth();
  if (!me) {
    redirect('/auth/login');
  }

  return me;
}
