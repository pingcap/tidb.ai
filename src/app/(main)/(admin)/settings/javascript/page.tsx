import JSConfigurePage from '@/app/(main)/(admin)/settings/javascript/page.client';
import { authGuard } from '@/lib/auth-server';

export default async function Page() {
  await authGuard('admin');

  return (
    <>
      <h1 className='text-xl font-semibold mb-4'>Conversation Search Box JS</h1>
      <JSConfigurePage />
    </>
  );
}

export const dynamic = 'force-dynamic';
