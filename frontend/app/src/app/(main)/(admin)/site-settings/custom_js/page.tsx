import { getAllSiteSettings } from '@/api/site-settings';
import { CustomJsSettings } from '@/components/settings/CustomJsSettings';

export default async function CustomJsSettingsPage () {
  const settings = await getAllSiteSettings();

  return (
    <>
      <CustomJsSettings schema={settings} />
    </>
  );
}

export const dynamic = 'force-dynamic';
