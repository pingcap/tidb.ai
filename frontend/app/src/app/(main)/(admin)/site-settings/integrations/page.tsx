import { getAllSiteSettings } from '@/api/site-settings';
import { IntegrationsSettings } from '@/components/settings/IntegrationsSettings';

export default async function LangfuseSettingsPage () {
  const settings = await getAllSiteSettings();

  return (
    <>
      <IntegrationsSettings schema={settings} />
    </>
  );
}

export const dynamic = 'force-dynamic';
