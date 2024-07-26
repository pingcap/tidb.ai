import { getAllSiteSettings } from '@/api/site-settings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';

export default async function SiteSettingsPage () {
  const settings = await getAllSiteSettings();

  return (
    <>
      <SecuritySettings schema={settings} />
    </>
  );
}

export const dynamic = 'force-dynamic';
