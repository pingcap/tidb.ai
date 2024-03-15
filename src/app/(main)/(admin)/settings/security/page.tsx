import SecurityPage from '@/app/(main)/(admin)/settings/security/page.client';
import { authGuard } from '@/lib/auth-server';

export default async function Page() {
  await authGuard('admin');

  return (
    <>
      <h1 className='text-xl font-semibold mb-4'>Security</h1>
      <SecurityPage />
    </>
  );
}

export const dynamic = 'force-dynamic';
