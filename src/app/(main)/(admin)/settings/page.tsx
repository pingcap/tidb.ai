import SettingsPage from '@/app/(main)/(admin)/settings/page.client';
import { authGuard } from '@/lib/auth-server';

export default async function ServerSettingsPage () {
  await authGuard('admin');

  return (
    <SettingsPage />
  );
}

export const dynamic = 'force-dynamic';
