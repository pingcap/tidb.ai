import { getAllSiteSettings } from '@/api/site-settings';
import { WebsiteSettings } from '@/components/settings/WebsiteSettings';

export default async function SiteSettingsPage () {
  const settings = await getAllSiteSettings();

  return (
    <>
      <WebsiteSettings schema={settings} />
    </>
  );
}

export const dynamic = 'force-dynamic';
